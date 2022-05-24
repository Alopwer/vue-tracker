<template>
  <div v-if="workspaces.personal.length && workspacesInitialized">
    <h2>My Workspaces</h2>
    <div class="workspace-container grid">
        <div v-for="workspace in workspaces.personal" :key="workspace.workspace_id" class="col-6 md:col-4 lg:col-3">
          <div class="workspace">
            <p>{{ workspace.title }}</p>
          </div>
        </div>
      <div class="col-6 md:col-4 lg:col-3">
        <Button class="workspace-container__btn" icon="pi pi-plus" @click="openCreateWorkspaceDialog" />
      </div>
    </div>
  </div>
  <div v-else-if="workspacesInitialized" class="create-workspace">
    <Button @click="openCreateWorkspaceDialog">Create workspace</Button>
  </div>
  <CreateWorkspaceModal :showWorkspaceDialog="showWorkspaceDialog" @toggleDialog="showWorkspaceDialog = $event" />
</template>

<script lang="ts">
import { defineComponent, computed, ref, onBeforeMount } from 'vue'
import { useStore } from '../store'
import CreateWorkspaceModal from '@/components/Workspace/CreateWorkspaceModal.vue'
import { useRouter } from 'vue-router'
import { WorkspaceActionTypes } from '../store/workspaces/action-types'

export default defineComponent({
  name: 'HomeView',
  components: {
    CreateWorkspaceModal
  },
  setup () {
    const { state, getters, dispatch } = useStore()
    const router = useRouter()

    const showWorkspaceDialog = ref(false)
    const isAuthenticated = computed(() => getters.isAuthenticated)
    const workspaces = computed(() => state.workspaces.workspaces)
    const workspacesInitialized = computed(() => !state.workspaces.isLoading && state.workspaces.isLoaded)

    onBeforeMount(() => {
      if (!isAuthenticated.value) {
        router.push('/auth')
        return
      }
      dispatch(WorkspaceActionTypes.GET_OWNERS_WORKSPACES)
    })

    const openCreateWorkspaceDialog = () => {
      showWorkspaceDialog.value = true
    }

    return {
      isAuthenticated,
      openCreateWorkspaceDialog,
      showWorkspaceDialog,
      workspaces,
      workspacesInitialized
    }
  }
})
</script>

<style lang="scss" scoped>
  .create-workspace {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .workspace-container {
    &__btn {
      border-radius: 10px;
      height: 100%;
      background: transparent;
      &.p-button.p-button-icon-only {
        width: 100%;
        min-height: 80px;
      }
    }
  }

  .workspace {
    min-height: 80px;
    padding: 5px 10px;
    background: var(--surface-card);
    border-radius: 10px;
    p {
      margin: 0;
    }
  }
</style>
