<template>
  <WorkspaceContainer />
</template>

<script lang="ts">
import WorkspaceContainer from '@/components/Workspace/WorkspaceContainer.vue'
import { CollectionMutationTypes } from '@/store/collections/mutation-types'
import { defineComponent, onBeforeMount } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'HomeView',
  components: {
    WorkspaceContainer
  },
  setup () {
    const { commit } = useStore()
    onBeforeMount(() => {
      commit(CollectionMutationTypes.SET_COLLECTIONS, [])
    })
  }
})
</script>
