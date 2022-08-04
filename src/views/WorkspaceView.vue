<template>
  <div v-if="workspaceDataIsLoaded">
    <CollectionContainer />
  </div>
  <AppLoader v-else />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import AppLoader from '@/components/Shared/Loader.vue'
import CollectionContainer from '@/components/Collection/CollectionContainer.vue'

export default defineComponent({
  components: {
    AppLoader,
    CollectionContainer
  },
  name: 'WorkspaceView',
  setup () {
    const { getters } = useStore()

    const workspaceDataIsLoaded = computed(() => getters.getLoadingState.isLoaded)

    return {
      workspaceDataIsLoaded
    }
  }
})
</script>
