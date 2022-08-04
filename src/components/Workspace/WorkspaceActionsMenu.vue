<template>
  <i @click.stop="toggleWorkspaceActionsMenu"
    class="pi pi-ellipsis-v cursor-pointer"
    aria-haspopup="true"
    aria-controls="workspace_actions_menu"></i>
  <Menu id="workspace_actions_menu" ref="workspaceActionsMenu" :model="workspaceActions" :popup="true" />
  <DeleteModal :showDeleteDialog="showDeleteDialog"
    :itemName="workspaceName"
    entityName="workspace"
    @onDelete="deleteWorkspace"
    @toggleDialog="showDeleteDialog = $event" />
</template>

<script lang="ts">
import { useMenu } from '@/hooks'
import { defineComponent, ref } from 'vue'
import DeleteModal from '@/components/Shared/DeleteModal.vue'

export default defineComponent({
  name: 'WorkspaceActionsMenu',
  props: {
    workspaceName: String
  },
  components: {
    DeleteModal
  },
  setup (props) {
    const showDeleteDialog = ref()

    const deleteWorkspace = () => {
      console.log(1)
    }

    const {
      menu: workspaceActionsMenu,
      toggleMenu: toggleWorkspaceActionsMenu
    } = useMenu()

    const workspaceActions = [
      {
        label: 'Update',
        icon: 'pi pi-refresh'
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: (event: Event) => {
          workspaceActionsMenu.value.toggle(event)
          showDeleteDialog.value = true
        }
      }
    ]

    return {
      workspaceActionsMenu,
      toggleWorkspaceActionsMenu,
      workspaceActions,
      deleteWorkspace,
      showDeleteDialog,
      ...props
    }
  }
})
</script>
