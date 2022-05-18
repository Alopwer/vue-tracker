<template>
  <Dialog header="Create workspace" v-model:visible="isDialogOpen">
    <template #header>
      <h3>Create workspace</h3>
    </template>

    <InputText v-model="workspaceName" placeholder="Workspace title" />

    <template #footer>
      <Button icon="pi pi-plus" @click="createWorkspace" />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, watchEffect, toRefs } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'CreateWorkspaceModal',
  emits: ['toggleDialog'],
  props: {
    showWorkspaceDialog: Boolean
  },
  setup (props, { emit }) {
    const { dispatch } = useStore()
    const workspaceName = ref('')

    const createWorkspace = () => {
      dispatch('createWorkspace', { title: workspaceName })
    }

    const isDialogOpen = computed({
      get: () => props.showWorkspaceDialog,
      set: (value) => {
        emit('toggleDialog', value)
      }
    })

    return {
      createWorkspace,
      workspaceName,
      isDialogOpen
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
</style>
