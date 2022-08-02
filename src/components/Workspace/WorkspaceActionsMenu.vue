<template>
  <i @click.stop="toggleWorkspaceActionsMenu"
    class="pi pi-ellipsis-v cursor-pointer"
    aria-haspopup="true"
    aria-controls="workspace_actions_menu"></i>
  <Menu id="workspace_actions_menu" ref="workspaceActionsMenu" :model="workpsaceActions" :popup="true" />
</template>

<script lang="ts">
import { useMenu } from '@/hooks'
import { defineComponent } from 'vue'

const workpsaceActions = [
  {
    label: 'Update',
    icon: 'pi pi-refresh'
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash'
  }
]

export default defineComponent({
  name: 'WorkspaceActionsMenu',
  setup () {
    const {
      menu: workspaceActionsMenu,
      toggleMenu: toggleWorkspaceActionsMenu
    } = useMenu()

    return {
      workspaceActionsMenu,
      toggleWorkspaceActionsMenu,
      workpsaceActions
    }
  }
})
</script>
