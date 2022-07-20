<template>
  <div>
    <Button icon="pi pi-user-edit"
      class="p-button-icon p-button-outlined p-button-secondary mr-3 p-button-sm"
      @click="toggleOverlay" />
    <OverlayPanel class="requests-panel" ref="overlayPanelRef" @show="onOverlayPanelShow" @hide="onOverlayPanelHide">
      <div>
        <div class="p-inputtext-sm p-input-icon-right w-full mb-2" ref="overlayInputRef">
          <InputText class="w-full" type="text" v-model="searchValue" />
          <i v-if="loadingState.isLoading" class="pi pi-spin pi-spinner" />
        </div>
        <TabView class="text-sm" v-model:activeIndex="activeTabIndex">
          <TabPanel header="Requested">
            <RequestsMenuTab :userConnections="connectionRequests.requested" />
          </TabPanel>
          <TabPanel header="Received">
            <RequestsMenuTab canAcceptConnectionRequest :userConnections="connectionRequests.received" />
          </TabPanel>
        </TabView>
      </div>
    </OverlayPanel>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import { debounce } from '@/utils'
import { useStore } from '../../../store'
import RequestsMenuTab from './RequestsMenuTab.vue'
import { CoworkerActionTypes } from '../../../store/coworkers/action-types'

type OverlayPanelElType = HTMLElement & { toggle: (...args: any[]) => any }

export default defineComponent({
  name: 'RequestsMenu',
  components: {
    RequestsMenuTab
  },
  setup () {
    const { state, dispatch } = useStore()

    const searchValue = ref('')
    const activeTabIndex = ref(0)
    const overlayPanelRef = ref<OverlayPanelElType | null>(null)
    const overlayInputRef = ref<HTMLInputElement | null>(null)

    const connectionRequests = computed(() => state.coworkers.connectionRequests)
    const loadingState = computed(() => state.coworkers.loadingState.requests)

    const toggleOverlay = (event: Event) => {
      overlayPanelRef.value!.toggle(event)
      nextTick(() => {
        if (overlayInputRef.value) {
          (overlayInputRef.value!.firstChild as HTMLInputElement).focus()
        }
      })
    }

    const onOverlayPanelShow = () => {
      dispatch(CoworkerActionTypes.GET_REQUESTED_CONNECTION_REQUESTS)
      dispatch(CoworkerActionTypes.GET_RECEIVED_CONNECTION_REQUESTS)
    }

    const onOverlayPanelHide = () => {
      searchValue.value = ''
    }

    const onSearchReceivedConnections = async (searchValue: string) => {
      dispatch(CoworkerActionTypes.GET_RECEIVED_CONNECTION_REQUESTS, searchValue)
    }

    const onSearchRequestedConnections = async (searchValue: string) => {
      dispatch(CoworkerActionTypes.GET_REQUESTED_CONNECTION_REQUESTS, searchValue)
    }

    const onSearch = debounce(async () => {
      onSearchRequestedConnections(searchValue.value)
      onSearchReceivedConnections(searchValue.value)
    }, 250)

    watch([searchValue], onSearch)

    return {
      overlayPanelRef,
      overlayInputRef,
      connectionRequests,
      searchValue,
      activeTabIndex,
      loadingState,
      toggleOverlay,
      onOverlayPanelShow,
      onOverlayPanelHide,
      onSearch
    }
  }
})
</script>

<style lang="scss">
  .requests-panel {
    .p-overlaypanel-content {
      min-width: 15rem;
      li {
        flex: 1;
      }
      .p-tabview-nav-link {
        justify-content: center;
      }
    }
  }
</style>
