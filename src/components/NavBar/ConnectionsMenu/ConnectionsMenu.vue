<template>
  <div>
    <Button icon="pi pi-users"
      class="p-button-icon p-button-outlined p-button-secondary mr-5 p-button-sm"
      @click="toggleUsersOverlay" />
    <OverlayPanel ref="overlayPanelRef">
      <div>
        <div class="p-inputtext-sm p-input-icon-right w-full mb-2" ref="userInputRef">
          <InputText class="w-full" type="text" v-model="searchValue" />
          <i v-if="loadingState.isLoading" class="pi pi-spin pi-spinner" />
        </div>
        <TabView class="text-sm" v-model:activeIndex="activeTabIndex">
          <TabPanel header="Your Connections">
            <ConnectionsMenuTab :userConnections="userConnections" />
          </TabPanel>
          <TabPanel header="Find Connections">
            <ConnectionsMenuTab :userConnections="foundUsers" />
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

type OverlayPanelElType = HTMLElement & { toggle: (...args: any[]) => any }

export default defineComponent({
  name: 'ConnectionsMenu',
  components: {
    ConnectionsMenuTab
  },
  setup () {
    const { state, dispatch, commit } = useStore()

    const searchValue = ref('')
    const activeTabIndex = ref(0)
    const overlayPanelRef = ref<OverlayPanelElType | null>(null)
    const userInputRef = ref<HTMLElement | null>(null)

    const userConnections = computed(() => state.coworkers.connections)
    const foundUsers = computed(() => state.coworkers.users)
    const loadingState = computed(() => state.coworkers.loadingState)

    const noUsersFound = computed(() =>
      !foundUsers.value.length &&
      searchValue.value &&
      !loadingState.value.isLoading &&
      loadingState.value.isLoaded
    )

    const toggleUsersOverlay = (event: Event) => {
      overlayPanelRef.value!.toggle(event)
      nextTick(() => {
        (userInputRef.value!.firstChild as HTMLInputElement).focus()
      })
    }

    const onSearchUsers = debounce(async (searchValue: string) => {
      if (!searchValue) {
        commit(CoworkerMutationTypes.SET_USERS, [])
        return
      }
      dispatch(CoworkerActionTypes.GET_USERS, searchValue)
    }, 500)

    const onSearchConnections = debounce(async (searchValue: string) => {
      dispatch(CoworkerActionTypes.GET_USER_CONNECTIONS, searchValue)
    }, 500)

    watch([activeTabIndex, searchValue], ([activeTabValue, searchValue], _) => {
      if (activeTabValue === 0) {
        onSearchConnections(searchValue)
        return
      }
      onSearchUsers(searchValue)
    })

    return {
      overlayPanelRef,
      userInputRef,
      noUsersFound,
      userConnections,
      searchValue,
      activeTabIndex,
      foundUsers,
      loadingState,
      onSearchUsers,
      toggleUsersOverlay
    }
  }
})
</script>
