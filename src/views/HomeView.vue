<template>
  <WorkspaceContainer />
</template>

<script lang="ts">
import WorkspaceContainer from '@/components/Workspace/WorkspaceContainer.vue'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'HomeView',
  components: {
    WorkspaceContainer
  }
})
</script>
