/* eslint-disable */
import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { State } from './state'
import { Collection } from '@/api/collection.api'

export type Getters = {
  getCollectionById(state: State): (id: string) => Collection | undefined;
  collectionsLoaded(state: State): boolean;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getCollectionById: (state) => (id) => {
    return state.collections.find(c => c.collectionId === id);
  },
  collectionsLoaded: (state) => state.loadingState.isLoaded && !state.loadingState.isLoading
}
