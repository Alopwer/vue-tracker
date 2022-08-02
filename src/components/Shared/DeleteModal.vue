<template>
  <Dialog :modal="true" :draggable="false" class="create-workspace-dialog" v-model:visible="isDialogOpen">
    <template #header>
      <h3>Delete collection</h3>
    </template>
    <div class="grid">
      <div class="col-12 md:col-6">
        <p>Are you sure you want to delete {{ itemName }}?</p>
      </div>
    </div>
    <template #footer>
      <Button icon="pi pi-minus" @click="$emit('toggleDialog')" />
      <Button icon="pi pi-plus" @click="$emit('onDelete')" />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, reactive } from 'vue'
import { useStore } from '../../store'
import { WorkspaceActionTypes } from '../../store/workspaces/action-types'
import { ListOption } from '../../common'

export default defineComponent({
  name: 'DeleteModal',
  emits: ['onDelete', 'toggleDialog'],
  props: {
    showDeleteDialog: Boolean,
    itemName: String
  },
  setup (props, { emit }) {
    const { dispatch, getters } = useStore()

    const isDialogOpen = computed({
      get: () => props.showDeleteDialog,
      set: (value) => {
        emit('toggleDialog', value)
      }
    })

    return {
      isDialogOpen,
      ...props
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

<style lang="scss">
  .create-workspace-dialog {
    margin: 15px;
  }
</style>
