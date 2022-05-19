import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { State } from './state'

export type Getters = {
  isAuthenticated(state: State): boolean,
  isAuthLoading(state: State): boolean,
}

export const getters: GetterTree<State, RootState> & Getters = {
  isAuthenticated: (state) => state.common.isLoggedIn && state.common.isLoaded,
  isAuthLoading: (state) => state.common.isLoading
}
