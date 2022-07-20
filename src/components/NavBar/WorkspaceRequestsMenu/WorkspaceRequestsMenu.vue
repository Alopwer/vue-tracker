<template>
  <div>
    <Button icon="pi pi-table"
      class="p-button-icon p-button-outlined p-button-secondary mr-3 p-button-sm"
      @click="toggleOverlay" />
    <OverlayPanel class="requests-panel" ref="overlayPanelRef" @show="onOverlayPanelShow">
      <div>
        <div v-if="Object.entries(workspaceRequestsData).length">
          <div v-for="[userId, requestData] in Object.entries(workspaceRequestsData)" :key="userId">
            <p>{{ requestData.username }} invited you to join:</p>
            <ul>
              <li v-for="request in requestData.requests" :key="request.workspaceId">
                <span>{{ request.title }}</span>
                <div class="btn-container">
                  <Button
                    icon="pi pi-plus"
                    class="p-button-success p-button-rounded p-button-text p-button-sm"
                    @click="acceptWorkspaceRequest(request.workspaceId)" />
                  <Button
                    icon="pi pi-minus"
                    class="p-button-danger p-button-rounded p-button-text p-button-sm"
                    @click="declineWorkspaceRequest(request.workspaceId)" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <p v-else class="my-1 text-center text-sm"> No requests found </p>
      </div>
    </OverlayPanel>
  </div>
</template>

<script lang="ts">
import { WorkspaceActionTypes } from '@/store/workspaces/action-types'
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '../../../store'

type OverlayPanelElType = HTMLElement & { toggle: (...args: any[]) => any }

export default defineComponent({
  name: 'WorkspaceRequestsMenu',
  setup () {
    const { dispatch, getters } = useStore()

    const overlayPanelRef = ref<OverlayPanelElType | null>(null)

    const workspaceRequestsData = computed(() => getters.getMappedWorkspaceRequests)

    const toggleOverlay = (event: Event) => {
      overlayPanelRef.value!.toggle(event)
    }

    const onOverlayPanelShow = () => {
      dispatch(WorkspaceActionTypes.GET_USER_WORKSPACES_REQUESTS)
    }

    const acceptWorkspaceRequest = (workspaceId: string) => {
      dispatch(WorkspaceActionTypes.ACCEPT_WORKSPACE_REQUEST, { workspaceId })
    }

    const declineWorkspaceRequest = (workspaceId: string) => {
      dispatch(WorkspaceActionTypes.DECLINE_WORKSPACE_REQUEST, { workspaceId })
    }

    return {
      overlayPanelRef,
      workspaceRequestsData,
      toggleOverlay,
      onOverlayPanelShow,
      acceptWorkspaceRequest,
      declineWorkspaceRequest
    }
  }
})
</script>

<style lang="scss" scoped>
  .requests-panel {
    p, ul {
      margin: 0;
    }
    ul {
      padding-left: 1rem;
    }
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0.5rem 0;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
