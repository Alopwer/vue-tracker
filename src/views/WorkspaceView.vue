<template>
  <div v-if="isLoaded">
    <h3>{{ workspace.title }}</h3>
    <div class="card-container grid">
      <div v-for="card in workspaceCards" :key="card.cardId" class="col-12 md:col-6 lg:col-3">
        <div class="card-container__item">
          {{ card.title }}
        </div>
      </div>
    </div>
    <Button @click="openCreateCardDialog" class="mt-3">Create Card</Button>
    <CreateCardModal :showCardDialog="showCardDialog"
      @toggleDialog="showCardDialog = $event"
      :workspaceId="workspaceId" />
  </div>
  <AppLoader v-else />
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../store'
import AppLoader from '@/components/Shared/Loader.vue'
import CreateCardModal from '@/components/Card/CreateCardModal.vue'
import { WorkspaceActionTypes } from '@/store/workspaces/action-types'

export default defineComponent({
  components: {
    AppLoader,
    CreateCardModal
  },
  name: 'WorkspaceView',
  setup () {
    const { state, dispatch, getters } = useStore()
    const route = useRoute()
    const workspaceId = route.params.id as string

    const showCardDialog = ref(false)

    onBeforeMount(() => {
      dispatch(WorkspaceActionTypes.GET_WORKSPACE_CARDS, { workspaceId })
    })

    const isLoaded = computed(() => getters.getLoadingState.isLoaded)
    const workspace = computed(() => getters.getWorkspaceById(workspaceId))
    const workspaceCards = computed(() => state.workspaces.selectedWorkspaceCards)

    const openCreateCardDialog = () => {
      showCardDialog.value = true
    }

    return {
      workspace,
      isLoaded,
      workspaceCards,
      openCreateCardDialog,
      showCardDialog,
      workspaceId
    }
  }
})
</script>

<style lang="scss" scoped>
.card-container {
  &__item {
    padding: 1rem 1.5rem;
    outline: 2px solid var(--surface-border);
    border-radius: 10px;
  }
}
</style>
