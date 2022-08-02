<template>
  <div v-if="collectionsLoaded">
    <h3>{{ collection.title }}</h3>
  </div>
  <AppLoader v-else />
</template>

<script lang="ts">
import { CollectionActionTypes } from '@/store/collections/action-types'
import { WorkspaceActionTypes } from '@/store/workspaces/action-types'
import { computed, defineComponent, onBeforeMount, onBeforeUnmount, onUnmounted } from '@vue/runtime-core'
import AppLoader from '@/components/Shared/Loader.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'CollectionView',
  components: {
    AppLoader
  },
  setup () {
    const { getters, state, dispatch } = useStore()
    const route = useRoute()
    const {
      workspaceId,
      collectionId
    } = route.params as { workspaceId: string, collectionId: string }

    onBeforeMount(() => {
      if (!state.collections.collections.length) {
        dispatch(CollectionActionTypes.GET_COLLECTIONS, { workspaceId })
      }
    })

    const collection = computed(() => getters.getCollectionById(collectionId))
    const collectionsLoaded = computed(() => getters.collectionsLoaded)

    return {
      collection,
      collectionsLoaded
    }
  }
})
</script>
