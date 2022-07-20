<template>
  <WorkspaceSection :shouldDisplay="workspaces.personal.length && workspacesInitialized"
    sectionTitle="My Workspaces"
    :isOwnWorkspace="true"
    :workspaces="workspaces.personal"
    @openCreateWorkspaceDialog="openCreateWorkspaceDialog" />
  <div v-if="!workspaces.personal.length && workspacesInitialized" class="create-workspace">
    <Button @click="openCreateWorkspaceDialog">Create workspace</Button>
  </div>
  <WorkspaceSection :shouldDisplay="workspacesInitialized"
    sectionTitle="Shared Workspaces"
    :isOwnWorkspace="false"
    :workspaces="workspaces.shared" />
  <CreateWorkspaceModal :showWorkspaceDialog="showWorkspaceDialog" @toggleDialog="showWorkspaceDialog = $event" />
</template>

<script lang="ts">
import { defineComponent, computed, ref, onBeforeMount, watch } from 'vue'
import { useStore } from '@/store'
import CreateWorkspaceModal from './CreateWorkspaceModal.vue'
import WorkspaceSection from './WorkspaceSection.vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

export default defineComponent({
  name: 'WorkspaceContainer',
  components: {
    CreateWorkspaceModal,
    WorkspaceSection
  },
  setup () {
    const { state, getters } = useStore()
    const router = useRouter()
    const toast = useToast()

    const showWorkspaceDialog = ref(false)
    const isAuthenticated = computed(() => getters.isAuthenticated)
    const workspaces = computed(() => state.workspaces.workspaces)
    const workspacesInitialized = computed(() => getters.getLoadingState)
    const workspaceShareCode = computed(() => state.workspaces.workspaceShareCode)

    onBeforeMount(() => {
      if (!isAuthenticated.value) {
        router.push('/auth')
      }
    })

    const openCreateWorkspaceDialog = () => {
      showWorkspaceDialog.value = true
    }

    watch(
      () => workspaceShareCode.value,
      shareCode => {
        if (shareCode) {
          navigator.clipboard.writeText(shareCode)
          toast.add({
            severity: 'info',
            summary: 'Info Message',
            detail: 'Share code has been copied',
            life: 1500
          })
        }
      }
    )

    return {
      isAuthenticated,
      openCreateWorkspaceDialog,
      showWorkspaceDialog,
      workspaces,
      workspacesInitialized,
      workspaceShareCode
    }
  }
})
</script>
