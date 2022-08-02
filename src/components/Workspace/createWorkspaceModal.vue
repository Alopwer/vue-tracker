<template>
  <Dialog :modal="true" :draggable="false" class="create-workspace-dialog" header="Create workspace" v-model:visible="isDialogOpen">
    <template #header>
      <h3>Create workspace</h3>
    </template>
    <div class="grid">
      <div class="col-12 md:col-6">
        <InputText class="w-full" v-model="workspaceData.workspaceName" placeholder="Workspace title" />
      </div>
      <div class="col-12 md:col-6 coworkers-select">
        <MultiSelect class="w-full"
          v-model="workspaceData.selectedCoworkers"
          :options="userConnections"
          optionLabel="label"
          placeholder="Select Coworkers" />
      </div>
      <div class="col-12 md:col-6">
        <input type="file" id="file-input" accept="image/png, image/jpeg, image/jpg" @change="onSelectFile">
      </div>
    </div>
    <template #footer>
      <Button icon="pi pi-plus" @click="createWorkspace" :loading="isLoading" :disabled="isLoading || !workspaceData.workspaceName.length" />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, reactive } from 'vue'
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
    const { dispatch, getters } = useStore()
    const workspaceData = reactive<{
      workspaceName: string,
      selectedCoworkers: Array<ListOption>,
      coverImage: File | null
    }>({
      workspaceName: '',
      selectedCoworkers: [],
      coverImage: null
    })
    const isLoading = ref(false)

    const userConnections = computed(() => getters.userConnectionsOptions)

    const createWorkspace = async () => {
      isLoading.value = true
      await dispatch(WorkspaceActionTypes.CREATE_WORKSPACE, {
        title: workspaceData.workspaceName,
        coworkers: workspaceData.selectedCoworkers.map((option: ListOption) => option.value),
        imageObject: workspaceData.coverImage
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
      workspaceData.workspaceName = ''
      workspaceData.selectedCoworkers = []
      workspaceData.coverImage = null
    }

    watch(isDialogOpen, (isDialogOpenValue) => !isDialogOpenValue && resetDialogData())

    const onSelectFile = (event: Event) => {
      const file = (event.target as HTMLInputElement).files![0]
      if (file) {
        workspaceData.coverImage = file
      }
    }

    return {
      createWorkspace,
      workspaceData,
      isDialogOpen,
      isLoading,
      userConnections,
      onSelectFile
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
