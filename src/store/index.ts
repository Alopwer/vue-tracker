import { createStore } from 'vuex'
import { store as auth, AuthStore, State as AuthState } from './auth'
import { store as coworkers, CoworkerStore, State as CoworkerState } from './coworkers'
import { store as workspaces, WorkspaceStore, State as WorkspaceState } from './workspaces'
import { store as collections, CollectionStore, State as CollectionState } from './collections'
import { store as common, CommonStore, State as CommonState } from './common'

export type RootState = {
  auth: AuthState,
  coworkers: CoworkerState,
  workspaces: WorkspaceState,
  collections: CollectionState,
  common: CommonState
}

export type Store = AuthStore<
  Pick<RootState, 'auth'>> &
  CoworkerStore<Pick<RootState, 'coworkers'>> &
  WorkspaceStore<Pick<RootState, 'workspaces'>> &
  CollectionStore<Pick<RootState, 'collections'>> &
  CommonStore<Pick<RootState, 'common'>>

export const store = createStore({
  modules: {
    auth,
    coworkers,
    workspaces,
    collections,
    common
  }
})

export function useStore (): Store {
  return store as Store
}
