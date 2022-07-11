<template>
  <Dialog :modal="true" :draggable="false" class="create-workspace-dialog" header="Create workspace" v-model:visible="isDialogOpen">
    <template #header>
      <h3>Create workspace</h3>
    </template>
    <div class="grid">
      <div class="col-12 md:col-6">
        <InputText class="w-full" v-model="workspaceName" placeholder="Workspace title" />
      </div>
      <div class="col-12 md:col-6 coworkers-select">
        <MultiSelect class="w-full"
          v-model="selectedCoworkers"
          :options="userConnections"
          optionLabel="label"
          placeholder="Select Coworkers" />
      </div>
    </div>
    <template #footer>
      <Button icon="pi pi-plus" @click="createWorkspace" :loading="isLoading" :disabled="isLoading || !workspaceName.length" />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, watchEffect, toRefs, ComputedRef, onBeforeUnmount } from 'vue'
import { useStore } from '../../store'
import { WorkspaceActionTypes } from '../../store/workspaces/action-types'
import { ListOption } from '../../common'

export default defineComponent({
  name: 'CreateWorkspaceModal',
  emits: ['toggleDialog'],
  props: {
    showWorkspaceDialog: Boolean
  },
  setup (props, { emit }) {
    const { dispatch, state, getters } = useStore()
    const workspaceName = ref('')
    const selectedCoworkers = ref([])
    const isLoading = ref(false)

    const userConnections = computed(() => getters.userConnectionsOptions)

    const createWorkspace = async () => {
      isLoading.value = true
      await dispatch(WorkspaceActionTypes.CREATE_WORKSPACE, {
        title: workspaceName.value,
        coworkers: selectedCoworkers.value.map((option: ListOption) => option.value)
      })
      isLoading.value = false
      emit('toggleDialog', false)
    }

    const isDialogOpen = computed({
      get: () => props.showWorkspaceDialog,
      set: (value) => {
        emit('toggleDialog', value)
      }
    })

    const resetDialogData = () => {
      workspaceName.value = ''
      selectedCoworkers.value = []
    }

    onBeforeUnmount(resetDialogData)

    return {
      createWorkspace,
      workspaceName,
      isDialogOpen,
      isLoading,
      selectedCoworkers,
      userConnections
    }
  }
})
</script>

<style scoped lang="scss">
  .p-dialog .p-dialog-footer button {
    width: 100%;
  }
  h3 {
    margin: 0;
  }
  .coworkers-select {
    min-width: 12rem;
  }
</style>

<style lang="scss">
  .create-workspace-dialog {
    margin: 15px;
  }
</style>
