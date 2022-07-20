<template>
  <Dialog :modal="true" :draggable="false" class="create-card-dialog" header="Create card" v-model:visible="isDialogOpen">
    <template #header>
      <h3>Create card</h3>
    </template>
    <div class="grid">
      <div class="col-12">
        <InputText class="w-full" v-model="cardData.title" placeholder="Card title" />
      </div>
      <div class="col-12">
        <Textarea class="w-full"
          v-model="cardData.description"
          :autoResize="true"
          placeholder="Description" />
      </div>
    </div>
    <template #footer>
      <Button icon="pi pi-plus" @click="createCard" :loading="isLoading" :disabled="isLoading || !cardData.title.length" />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, watch } from 'vue'
import { useStore } from '../../store'
import { WorkspaceActionTypes } from '../../store/workspaces/action-types'

export default defineComponent({
  name: 'CreateCardDialog',
  emits: ['toggleDialog'],
  props: {
    showCardDialog: Boolean,
    workspaceId: String
  },
  setup (props, { emit }) {
    const { dispatch } = useStore()

    const isLoading = ref(false)
    const cardData = reactive({
      title: '',
      description: ''
    })

    const createCard = async () => {
      isLoading.value = true
      await dispatch(
        WorkspaceActionTypes.CREATE_WORKSPACE_CARD,
        {
          ...cardData,
          workspaceId: props.workspaceId
        }
      )
      isLoading.value = false
      emit('toggleDialog', false)
    }

    const isDialogOpen = computed({
      get: () => props.showCardDialog,
      set: (value) => {
        emit('toggleDialog', value)
      }
    })

    const resetDialogData = () => {
      cardData.title = ''
      cardData.description = ''
    }

    watch(isDialogOpen, (isDialogOpenValue) => !isDialogOpenValue && resetDialogData())

    return {
      isDialogOpen,
      isLoading,
      cardData,
      createCard
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
  .create-card-dialog {
    margin: 15px;
  }
</style>
