<template>
  <Dialog :modal="true" :draggable="false" class="create-workspace-dialog" v-model:visible="isDialogOpen">
    <template #header>
      <h3>Delete {{ entityName }}</h3>
    </template>
    <div class="grid">
      <div class="col-12">
        <p>Are you sure you want to delete {{ itemName }}?</p>
      </div>
    </div>
    <template #footer>
      <div class="flex">
        <Button @click="$emit('toggleDialog')">Cancel</Button>
        <Button @click="$emit('onDelete')">Delete</Button>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, reactive, toRefs } from 'vue'
import { useStore } from '../../store'
import { WorkspaceActionTypes } from '../../store/workspaces/action-types'
import { ListOption } from '../../common'

export default defineComponent({
  name: 'DeleteModal',
  emits: ['onDelete', 'toggleDialog'],
  props: {
    showDeleteDialog: Boolean,
    itemName: String,
    entityName: String
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
      ...toRefs(props)
    }
  }
})
</script>

<style scoped lang="scss">
  .p-dialog .p-dialog-footer {
    button {
      text-align: center;
      display: inline-block;
      width: 50%;
      &:last-child {
        margin-right: 0;
      }
    }
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
