import { ActionContext, ActionTree } from 'vuex'
import { Mutations } from './mutations'
import { State } from './state'
import { RootState } from '@/store'
import { CollectionActionTypes } from './action-types'
import { CollectionApi, CreateCollectionDto } from '@/api/collection.api'
import { CollectionMutationTypes } from './mutation-types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [CollectionActionTypes.GET_COLLECTIONS](
    { commit }: AugmentedActionContext,
    payload: { workspaceId: string }
  ): Promise<unknown>,
  [CollectionActionTypes.CREATE_COLLECTION](
    { commit }: AugmentedActionContext,
    payload: { workspaceId: string } & CreateCollectionDto
  ): Promise<unknown>
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [CollectionActionTypes.GET_COLLECTIONS] (context, data) {
    try {
      context.commit(CollectionMutationTypes.SET_IS_LOADING, true)
      const collections = await CollectionApi.getCollections(data.workspaceId)
      context.commit(CollectionMutationTypes.SET_COLLECTIONS, collections)
      context.commit(CollectionMutationTypes.SET_IS_LOADING, false)
      context.commit(CollectionMutationTypes.SET_IS_LOADED, true)
    } catch (e) {}
  },
  async [CollectionActionTypes.CREATE_COLLECTION] (context, { workspaceId, ...createWorkspaceCollectionData }) {
    try {
      await CollectionApi.createCollection(workspaceId, createWorkspaceCollectionData)
      context.dispatch(CollectionActionTypes.GET_COLLECTIONS, { workspaceId })
    } catch (e) {}
  }
}
