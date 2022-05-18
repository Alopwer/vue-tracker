<template>
  <div v-if="isLoggedIn">
    <Button @click="openCreateWorkspaceDialog">Create workspace</Button>
  </div>
  <div v-else>
    auth before proceeding
  </div>
  <CreateWorkspaceModal :showWorkspaceDialog="showWorkspaceDialog" @toggleDialog="showWorkspaceDialog = $event" />
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import CreateWorkspaceModal from '@/components/Workspace/createWorkspaceModal.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    CreateWorkspaceModal
  },
  setup () {
    const { state } = useStore()

    const showWorkspaceDialog = ref(false)

    const openCreateWorkspaceDialog = () => {
      showWorkspaceDialog.value = true
    }

    return {
      isLoggedIn: computed(() => state.auth.common.isLoggedIn),
      openCreateWorkspaceDialog,
      showWorkspaceDialog
    }
  }
})
</script>
