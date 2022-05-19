<template>
  <div class="create-workspace" v-if="isAuthenticated">
    <Button @click="openCreateWorkspaceDialog">Create workspace</Button>
  </div>
  <CreateWorkspaceModal :showWorkspaceDialog="showWorkspaceDialog" @toggleDialog="showWorkspaceDialog = $event" />
</template>

<script lang="ts">
import { defineComponent, computed, ref, onBeforeMount } from 'vue'
import { useStore } from '../store'
import CreateWorkspaceModal from '@/components/Workspace/CreateWorkspaceModal.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'HomeView',
  components: {
    CreateWorkspaceModal
  },
  setup () {
    const { state, getters } = useStore()
    const router = useRouter()

    const showWorkspaceDialog = ref(false)
    const isAuthenticated = computed(() => getters.isAuthenticated)

    onBeforeMount(() => {
      if (!isAuthenticated.value) {
        router.push('/auth')
      }
    })

    const openCreateWorkspaceDialog = () => {
      showWorkspaceDialog.value = true
    }

    return {
      isAuthenticated,
      openCreateWorkspaceDialog,
      showWorkspaceDialog
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
</style>
