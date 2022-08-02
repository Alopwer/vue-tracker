<template>
  <div v-if="workspaceDataIsLoaded">
    <div class="flex align-items-center">
      <span class="my-3 mr-3 p-input-icon-right workspace-title">
        <InputText id="workspaceTitleInput"
          :disabled="isTitleDisabled"
          v-model="workspaceTitle"
          @blur="onInputBlur" />
        <i @click="toggleDisabledState" class="pi pi-pencil cursor-pointer workspace-title__edit" />
      </span>
      <WorkspaceActionsMenu />
    </div>
    <div class="collection-container grid" v-if="collectionsLoaded">
      <div v-for="collection in workspaceCollections" :key="collection.collectionId" class="col-12 md:col-6 lg:col-3">
        <div class="collection-container__item cursor-pointer" @click="() => goToCollectionPage(collection.collectionId)">
          {{ collection.title }}
          <i @click.stop="toggleCollectionActionsMenu"
            class="pi pi-ellipsis-v cursor-pointer"
            aria-haspopup="true"
            aria-controls="collection_actions_meu"></i>
          <Menu id="collection_actions_menu" ref="collectionActionsMenu" :model="collectionActions" :popup="true">
            <template #item="{item}">
              <a class="p-menuitem-link" role="menuitem" @click="item.command(collection.collectionId)">
                <span :class="['p-menuitem-icon pi', item.icon]"></span>
                <span class="p-menuitem-text">{{item.label}}</span>
              </a>
            </template>
          </Menu>
        </div>
      </div>
    </div>
    <AppLoader v-else />
    <Button @click="openCreateCollectionDialog" class="mt-3">Create Collection</Button>
    <CreateCollectionModal :showCollectionDialog="showCollectionDialog"
      @toggleDialog="showCollectionDialog = $event"
      :workspaceId="workspaceId" />
    <DeleteModal :showDeleteDialog="deleteDialogData.show"
      :itemName="deleteDialogData.collectionName"
      @onDelete="deleteCollection"
      @toggleDialog="deleteDialogData.show = $event" />
  </div>
  <AppLoader v-else />
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, ref, watch, nextTick, onBeforeUnmount, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '../store'
import AppLoader from '@/components/Shared/Loader.vue'
import CreateCollectionModal from '@/components/Collection/CreateCollectionModal.vue'
import WorkspaceActionsMenu from '@/components/Workspace/WorkspaceActionsMenu.vue'
import { WorkspaceActionTypes } from '@/store/workspaces/action-types'
import { CollectionActionTypes } from '@/store/collections/action-types'
import { CollectionMutationTypes } from '@/store/collections/mutation-types'
import DeleteModal from '@/components/Shared/DeleteModal.vue'

export default defineComponent({
  components: {
    AppLoader,
    CreateCollectionModal,
    WorkspaceActionsMenu,
    DeleteModal
  },
  name: 'WorkspaceView',
  setup () {
    const { state, dispatch, getters, commit } = useStore()
    const route = useRoute()
    const workspaceId = route.params.id as string

    const deleteDialogData = reactive({
      collectionId: '',
      show: false,
      collectionName: ''
    })

    const showCollectionDialog = ref(false)
    const collectionActionsMenu = ref()

    const collectionActions = [
      {
        label: 'Details',
        icon: 'pi pi-book'
      },
      {
        label: 'Update',
        icon: 'pi pi-refresh'
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: (id: string) => {
          deleteDialogData.collectionId = id
          deleteDialogData.show = true
        }
      }
    ]

    const deleteCollection = () => {
      console.log(deleteDialogData.collectionId)
    }

    onBeforeMount(() => {
      if (!state.collections.collections.length) {
        dispatch(CollectionActionTypes.GET_COLLECTIONS, { workspaceId })
      }
    })

    const collectionsLoaded = computed(() => getters.collectionsLoaded)
    const workspaceDataIsLoaded = computed(() => getters.getLoadingState.isLoaded)
    const workspace = computed(() => getters.getWorkspaceById(workspaceId))
    const workspaceCollections = computed(() => state.collections.collections)

    const openCreateCollectionDialog = () => {
      showCollectionDialog.value = true
    }

    const toggleCollectionActionsMenu = (event: Event) => {
      collectionActionsMenu.value[0].toggle(event)
    }

    const workspaceTitle = ref('')
    const isTitleDisabled = ref(true)

    watch(workspace, (workspaceItem) => {
      if (workspaceItem) {
        workspaceTitle.value = workspaceItem.title
      }
    }, { immediate: true })

    const toggleDisabledState = () => {
      isTitleDisabled.value = !isTitleDisabled.value
      nextTick(() => {
        !isTitleDisabled.value && document.getElementById('workspaceTitleInput')?.focus()
      })
    }

    const onInputBlur = () => {
      isTitleDisabled.value = true
    }

    const router = useRouter()

    const goToCollectionPage = (collectionId: string) =>
      router.push(`/workspaces/${workspaceId}/collections/${collectionId}`)

    return {
      workspace,
      workspaceDataIsLoaded,
      workspaceCollections,
      openCreateCollectionDialog,
      showCollectionDialog,
      workspaceId,
      toggleCollectionActionsMenu,
      collectionActionsMenu,
      collectionActions,
      workspaceTitle,
      isTitleDisabled,
      toggleDisabledState,
      onInputBlur,
      goToCollectionPage,
      collectionsLoaded,
      deleteDialogData,
      deleteCollection
    }
  }
})
</script>

<style lang="scss" scoped>
.collection-container {
  &__item {
    background: var(--surface-card);
    padding: 1rem 1.5rem;
    outline: 2px solid transparent;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    transition: all 0.2s ease-in-out;
    i {
      display: flex;
      align-self: center;
    }
    &:hover {
      background: var(--surface-ground);
      outline: 2px solid var(--surface-border);
    }
  }
}
.workspace-title {
  input {
    border: 1px solid transparent;
    &:hover {
      border: 1px solid transparent;
    }
    &:disabled {
      opacity: 1;
    }
  }
}
</style>
