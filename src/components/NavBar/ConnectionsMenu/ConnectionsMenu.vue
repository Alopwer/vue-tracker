<template>
  <div>
    <Button icon="pi pi-users"
      class="p-button-icon p-button-outlined p-button-secondary mr-5 p-button-sm"
      @click="toggleUsersOverlay" />
    <OverlayPanel ref="overlayPanelRef">
      <div>
        <div class="p-inputtext-sm p-input-icon-right w-full mb-2" ref="userInputRef">
          <InputText class="w-full" type="text" v-model="usersSearchState.searchValue" />
          <i v-if="usersSearchState.isLoading" class="pi pi-spin pi-spinner" />
        </div>
        <TabView class="text-sm" v-model:activeIndex="usersSearchState.activeTabIndex">
          <TabPanel header="Your Connections">
            <ConnectionsMenuTab :userConnections="userConnections" />
          </TabPanel>
          <TabPanel header="Find Connections">
            <ConnectionsMenuTab :userConnections="usersSearchState.foundUsers" />
          </TabPanel>
        </TabView>
      </div>
    </OverlayPanel>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive, Ref, ref, watch } from 'vue'
import { debounce } from '@/utils'
import { useStore } from '../../../store'
import { User, UserApi } from '../../../api/user.api'
import ConnectionsMenuTab from './ConnectionsMenuTab.vue'
import { CoworkerMutationTypes } from '../../../store/coworkers/mutation-types'
import { CoworkerActionTypes } from '../../../store/coworkers/action-types'

type OverlayPanelElType = HTMLElement & { toggle: (event: Event) => void; }

export default defineComponent({
  name: 'ConnectionsMenu',
  components: {
    ConnectionsMenuTab
  },
  setup () {
    const { state, dispatch, commit } = useStore()

    const usersSearchState = reactive({
      isLoading: false,
      isLoaded: false,
      foundUsers: [] as User[],
      searchValue: '',
      activeTabIndex: 0
    })

    const overlayPanelRef = ref<OverlayPanelElType | null>(null)
    const userInputRef = ref<HTMLElement | null>(null)

    const noUsersFound = computed(() =>
      !usersSearchState.foundUsers.length &&
      usersSearchState.searchValue &&
      !usersSearchState.isLoading &&
      usersSearchState.isLoaded
    )

    const toggleUsersOverlay = (event: Event) => {
      overlayPanelRef.value!.toggle(event)
      nextTick(() => {
        (userInputRef.value!.firstChild as HTMLInputElement).focus()
      })
    }

    // refactor this shit
    const onSearchUsers = debounce(async (searchValue: string) => {
      if (!searchValue) {
        usersSearchState.foundUsers = []
        return
      }
      usersSearchState.isLoaded = false
      usersSearchState.isLoading = true
      usersSearchState.foundUsers = await UserApi.getUsersByUserName(searchValue)
      usersSearchState.isLoading = false
      usersSearchState.isLoaded = true
    }, 500)

    const onSearchConnections = debounce(async (searchValue: string) => {
      usersSearchState.isLoaded = false
      usersSearchState.isLoading = true
      dispatch(CoworkerActionTypes.GET_USER_CONNECTIONS, searchValue as string)
      usersSearchState.isLoading = false
      usersSearchState.isLoaded = true
    }, 500)

    watch(() => [usersSearchState.activeTabIndex, usersSearchState.searchValue], ([activeTabValue, searchValue], _) => {
      if (activeTabValue === 0) {
        onSearchConnections(searchValue)
        return
      }
      onSearchUsers(searchValue)
    })

    const userConnections = computed(() => state.coworkers.connections)

    return {
      overlayPanelRef,
      userInputRef,
      noUsersFound,
      userConnections,
      usersSearchState,
      onSearchUsers,
      toggleUsersOverlay
    }
  }
})
</script>
