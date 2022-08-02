import { MutationTree } from 'vuex'
import { CommonMutationTypes } from './mutation-types'
import { State } from './state'

export type Mutations<S = State> = {
  [CommonMutationTypes.SET_ERROR](state: S, payload: string): void
}

export const mutations: MutationTree<State> & Mutations = {
  [CommonMutationTypes.SET_ERROR] (state, payload) {
    state.error = payload
  }
}
