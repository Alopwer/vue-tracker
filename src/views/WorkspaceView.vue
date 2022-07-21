<template>
  <div v-if="isLoaded">
    <h3>{{ workspace.title }}</h3>
    <div class="collection-container grid">
      <div v-for="collection in workspaceCollections" :key="collection.collectionId" class="col-12 md:col-6 lg:col-3">
        <div class="collection-container__item">
          {{ collection.title }}
        </div>
      </div>
    </div>
    <Button @click="openCreateCollectionDialog" class="mt-3">Create Collection</Button>
    <CreateCollectionModal :showCollectionDialog="showCollectionDialog"
      @toggleDialog="showCollectionDialog = $event"
      :workspaceId="workspaceId" />
  </div>
  <AppLoader v-else />
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../store'
import AppLoader from '@/components/Shared/Loader.vue'
import CreateCollectionModal from '@/components/Collection/CreateCollectionModal.vue'
import { WorkspaceActionTypes } from '@/store/workspaces/action-types'

export default defineComponent({
  components: {
    AppLoader,
    CreateCollectionModal
  },
  name: 'WorkspaceView',
  setup () {
    const { state, dispatch, getters } = useStore()
    const route = useRoute()
    const workspaceId = route.params.id as string

    const showCollectionDialog = ref(false)

    onBeforeMount(() => {
      dispatch(WorkspaceActionTypes.GET_WORKSPACE_CARDS, { workspaceId })
    })

    const isLoaded = computed(() => getters.getLoadingState.isLoaded)
    const workspace = computed(() => getters.getWorkspaceById(workspaceId))
    const workspaceCollections = computed(() => state.workspaces.selectedWorkspaceCollections)

    const openCreateCollectionDialog = () => {
      showCollectionDialog.value = true
    }

    return {
      workspace,
      isLoaded,
      workspaceCollections,
      openCreateCollectionDialog,
      showCollectionDialog,
      workspaceId
    }
  }
})
</script>

<style lang="scss" scoped>
.collection-container {
  &__item {
    padding: 1rem 1.5rem;
    outline: 2px solid var(--surface-border);
    border-radius: 10px;
  }
}
</style>
