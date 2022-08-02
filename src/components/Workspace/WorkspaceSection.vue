<template>
  <div v-if="shouldDisplay">
    <div class="flex align-items-center">
      <h2>{{ sectionTitle }}</h2>
      <Button v-if="!isOwnWorkspace"
        icon="pi pi-plus"
        class="p-button-icon p-button-outlined p-button-secondary p-button-sm ml-3"
        @click="addByShareCode"/>
    </div>
    <div class="workspace-container grid">
      <div v-for="workspace in workspaces" :key="workspace.workspaceId" class="col-6 md:col-4 lg:col-3">
        <div class="workspace cursor-pointer"
          @click="goToWorkspacePage(workspace.workspaceId)"
          :style="[workspace.coverImageUrl && { backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${workspace.coverImageUrl}')` }]">
          <div class="flex justify-content-between">
            <p>{{ workspace.title }}</p>
            <WorkspaceActionsMenu />
          </div>
          <div class="workspace-footer">
            <Button v-if="isOwnWorkspace"
              icon="pi pi-link"
              class="p-button-sm p-button-icon p-button-outlined"
              @click.stop="getWorkspaceShareCode(workspace.workspaceId)" />
            <div v-else></div>
            <div v-if="workspace.coworkers.length" class="workspace-coworkers">
              <Button icon="pi pi-users"
                class="workspace-coworkers__btn p-button-icon p-button-outlined p-button-sm"
                @click.stop="event => toggleCoworkersOverlay(event, workspace.workspaceId)" />
              <OverlayPanel :ref="el => setItemRef(el, workspace.workspaceId)">
                <div>
                  <p class="coworkers__item" v-for="coworker in workspace.coworkers" :key="coworker.userId">{{ coworker.username }}</p>
                </div>
              </OverlayPanel>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 md:col-4 lg:col-3" v-if="isOwnWorkspace">
        <Button class="workspace-container__btn" icon="pi pi-plus" @click="openCreateWorkspaceDialog" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { WorkspaceActionTypes } from '@/store/workspaces/action-types'
import { OverlayPanelElType } from '@/common'
import WorkspaceActionsMenu from './WorkspaceActionsMenu.vue'

export default defineComponent({
  name: 'WorkspaceSection',
  components: {
    WorkspaceActionsMenu
  },
  props: [
    'shouldDisplay',
    'sectionTitle',
    'workspaces',
    'isOwnWorkspace'
  ],
  emits: [
    'openCreateWorkspaceDialog'
  ],
  setup (props, { emit }) {
    const { state, dispatch } = useStore()
    const router = useRouter()

    const propsData = toRefs(props)

    const coworkersPanelRefs: { [key: string]: OverlayPanelElType } = {}

    const goToWorkspacePage = (id: string) => router.push(`/workspaces/${id}`)

    const getWorkspaceShareCode = (id: string) => {
      dispatch(WorkspaceActionTypes.GET_WORKSPACE_SHARE_CODE, { workspaceId: id })
    }

    const setItemRef = (el: OverlayPanelElType, id: string) => {
      if (el) {
        coworkersPanelRefs[id] = el
      }
    }

    const toggleCoworkersOverlay = (event: Event, id: number) => {
      coworkersPanelRefs[id].toggle(event)
    }

    const addByShareCode = async () => {
      const shareCode = await navigator.clipboard.readText()
      await dispatch(WorkspaceActionTypes.ADD_WORKSPACE_BY_SHARE_CODE, { workspaceShareCode: shareCode })
      dispatch(WorkspaceActionTypes.GET_SHARED_WORKSPACES)
    }

    return {
      goToWorkspacePage,
      getWorkspaceShareCode,
      setItemRef,
      toggleCoworkersOverlay,
      addByShareCode,
      openCreateWorkspaceDialog: () => emit('openCreateWorkspaceDialog'),
      ...propsData
    }
  }
})
</script>

<style lang="scss" scoped>
  .workspace-container {
    &__btn {
      border-radius: 10px;
      height: 100%;
      background: transparent;
      &.p-button.p-button-icon-only {
        width: 100%;
        min-height: 100px;
      }
    }
  }

  .workspace {
    min-height: 100px;
    padding: 5px 10px;
    background: var(--surface-card);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    outline: 2px solid transparent;
    background-size: contain;
    transition: all 0.2s ease-in-out;
    p {
      margin: 0;
    }
    i {
      display: flex;
      align-self: center;
    }
    &-coworkers {
      text-align: right;
    }
    .p-button.p-button-outlined {
      color: var(--text-color);
    }
    &:hover {
      background: var(--surface-ground);
      background-size: contain;
      outline: 2px solid var(--surface-border);
    }
    &-footer {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
  }

  .coworkers__item {
    margin: 0;
  }
</style>
