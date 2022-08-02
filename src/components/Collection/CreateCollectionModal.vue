<template>
  <Dialog :modal="true" :draggable="false" class="create-collection-dialog" header="Create collection" v-model:visible="isDialogOpen">
    <template #header>
      <h3>Create collection</h3>
    </template>
    <div class="grid">
      <div class="col-12">
        <InputText class="w-full" v-model="collectionData.title" placeholder="Collection title" />
      </div>
      <div class="col-12">
        <Textarea class="w-full"
          v-model="collectionData.description"
          :autoResize="true"
          placeholder="Description" />
      </div>
    </div>
    <template #footer>
      <Button icon="pi pi-plus" @click="createCollection" :loading="isLoading" :disabled="isLoading || !collectionData.title.length" />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { CollectionActionTypes } from '@/store/collections/action-types'
import { defineComponent, computed, ref, reactive, watch } from 'vue'
import { useStore } from '../../store'
import { WorkspaceActionTypes } from '../../store/workspaces/action-types'

export default defineComponent({
  name: 'CreateCollectionModal',
  emits: ['toggleDialog'],
  props: {
    showCollectionDialog: Boolean,
    workspaceId: String
  },
  setup (props, { emit }) {
    const { dispatch } = useStore()

    const isLoading = ref(false)
    const collectionData = reactive({
      title: '',
      description: ''
    })

    const createCollection = async () => {
      isLoading.value = true
      await dispatch(
        CollectionActionTypes.CREATE_COLLECTION,
        {
          ...collectionData,
          workspaceId: props.workspaceId!
        }
      )
      isLoading.value = false
      emit('toggleDialog', false)
    }

    const isDialogOpen = computed({
      get: () => props.showCollectionDialog,
      set: (value) => {
        emit('toggleDialog', value)
      }
    })

    const resetDialogData = () => {
      collectionData.title = ''
      collectionData.description = ''
    }

    watch(isDialogOpen, (isDialogOpenValue) => !isDialogOpenValue && resetDialogData())

    return {
      isDialogOpen,
      isLoading,
      collectionData,
      createCollection
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
  .create-collection-dialog {
    margin: 15px;
  }
</style>
