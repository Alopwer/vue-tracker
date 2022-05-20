import { User } from '@/api/user.api'
import { MutationTree } from 'vuex'
import { CoworkerMutationTypes } from './mutation-types'
import { State } from './state'

export type Mutations<S = State> = {
  [CoworkerMutationTypes.SET_USER_CONNECTIONS](state: S, payload: User[]): void
}

export const mutations: MutationTree<State> & Mutations = {
  [CoworkerMutationTypes.SET_USER_CONNECTIONS] (state, payload) {
    state.connections = payload
  }
}
