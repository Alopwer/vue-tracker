import { createStore } from 'vuex'
import { store as auth, AuthStore, State as AuthState } from './auth'
import { store as coworkers, CoworkerStore, State as CoworkerState } from './coworkers'
import { store as workspaces, WorkspaceStore, State as WorkspaceState } from './workspaces'

export type RootState = {
  auth: AuthState,
  coworkers: CoworkerState,
  workspaces: WorkspaceState,
}

export type Store = AuthStore<Pick<RootState, 'auth'>> & CoworkerStore<Pick<RootState, 'coworkers'>> & WorkspaceStore<Pick<RootState, 'workspaces'>>

export const store = createStore({
  modules: {
    auth,
    coworkers,
    workspaces
  }
})

export function useStore (): Store {
  return store as Store
}
