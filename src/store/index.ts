import { createStore } from 'vuex'
import { store as auth, AuthStore, State as AuthState } from './auth'
import { store as coworkers, CoworkerStore, State as CoworkerState } from './coworkers'

export type RootState = {
  auth: AuthState,
  coworkers: CoworkerState,
}

export type Store = AuthStore<Pick<RootState, 'auth'>> & CoworkerStore<Pick<RootState, 'coworkers'>>

export const store = createStore({
  modules: {
    auth,
    coworkers
  }
})

export function useStore (): Store {
  return store as Store
}
