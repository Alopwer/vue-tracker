<template>
  <div>
    <Button icon="pi pi-users"
      class="p-button-icon p-button-outlined p-button-secondary mr-5 p-button-sm"
      @click="toggleUsersOverlay" />
    <OverlayPanel ref="overlayPanelRef" @show="onOverlayPanelShow" @hide="onOverlayPanelHide">
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
            <ConnectionsMenuTab canSendConnectionRequest :userConnections="foundUsers" />
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
    const userInputRef = ref<HTMLInputElement | null>(null)

    const userConnections = computed(() => state.coworkers.connections)
    const foundUsers = computed(() => state.coworkers.users)
    const loadingState = computed(() => state.coworkers.loadingState.connections)

    const toggleUsersOverlay = (event: Event) => {
      overlayPanelRef.value!.toggle(event)
      nextTick(() => {
        if (userInputRef.value) {
          (userInputRef.value!.firstChild as HTMLInputElement).focus()
        }
      })
    }

    const onOverlayPanelShow = () => {
      dispatch(CoworkerActionTypes.GET_USER_CONNECTIONS)
    }

    const onOverlayPanelHide = () => {
      searchValue.value = ''
    }

    const onSearchUsers = async (searchValue: string) => {
      if (!searchValue) {
        commit(CoworkerMutationTypes.SET_USERS, [])
        return
      }
      dispatch(CoworkerActionTypes.GET_USERS, searchValue)
    }

    const onSearchConnections = async (searchValue: string) => {
      return dispatch(CoworkerActionTypes.GET_USER_CONNECTIONS, searchValue)
    }

    const onSearch = debounce(async () => {
      await onSearchConnections(searchValue.value)
      onSearchUsers(searchValue.value)
    }, 250)

    watch([searchValue], onSearch)

    return {
      overlayPanelRef,
      userInputRef,
      userConnections,
      searchValue,
      activeTabIndex,
      foundUsers,
      loadingState,
      onSearchUsers,
      toggleUsersOverlay,
      onOverlayPanelShow,
      onOverlayPanelHide,
      onSearch
    }
  }
})
</script>
