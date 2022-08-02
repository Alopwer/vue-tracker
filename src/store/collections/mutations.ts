import { Collection } from '@/api/collection.api'
import { MutationTree } from 'vuex'
import { CollectionMutationTypes } from './mutation-types'
import { State } from './state'

export type Mutations<S = State> = {
  [CollectionMutationTypes.SET_COLLECTIONS](state: S, payload: Collection[]): void;
  [CollectionMutationTypes.SET_IS_LOADED](state: S, payload: boolean): void;
  [CollectionMutationTypes.SET_IS_LOADING](state: S, payload: boolean): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [CollectionMutationTypes.SET_COLLECTIONS] (state, payload) {
    state.collections = payload
  },
  [CollectionMutationTypes.SET_IS_LOADED] (state, payload) {
    state.loadingState.isLoaded = payload
  },
  [CollectionMutationTypes.SET_IS_LOADING] (state, payload) {
    state.loadingState.isLoading = payload
  }
}
