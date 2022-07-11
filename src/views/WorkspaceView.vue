<template>
  <div v-if="isLoaded">{{ workspace.title }}</div>
  <AppLoader v-else />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../store'
import AppLoader from '@/components/Shared/Loader.vue'

export default defineComponent({
  components: {
    AppLoader
  },
  name: 'WorkspaceView',
  setup () {
    const { state, getters } = useStore()
    const route = useRoute()

    const isLoaded = computed(() => getters.getLoadingState.isLoaded)
    const workspaceId = route.params.id as string
    const workspace = computed(() => getters.getWorkspaceById(workspaceId))

    return {
      workspace,
      isLoaded
    }
  }
})
</script>
