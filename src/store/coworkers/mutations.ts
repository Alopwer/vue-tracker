import { User } from '@/api/user.api'
import { MutationTree } from 'vuex'
import { CoworkerMutationTypes } from './mutation-types'
import { State } from './state'

export type Mutations<S = State> = {
  [CoworkerMutationTypes.SET_USER_CONNECTIONS](state: S, payload: User[]): void;
  [CoworkerMutationTypes.SET_USERS](state: S, payload: User[]): void;
  [CoworkerMutationTypes.SET_IS_LOADING](state: S, payload: boolean): void;
  [CoworkerMutationTypes.SET_IS_LOADED](state: S, payload: boolean): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [CoworkerMutationTypes.SET_USERS] (state, payload) {
    state.users = payload
  },
  [CoworkerMutationTypes.SET_USER_CONNECTIONS] (state, payload) {
    state.connections = payload
  },
  [CoworkerMutationTypes.SET_IS_LOADING] (state, payload) {
    state.loadingState.isLoading = payload
  },
  [CoworkerMutationTypes.SET_IS_LOADED] (state, payload) {
    state.loadingState.isLoaded = payload
  }
}
