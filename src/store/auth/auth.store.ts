import { CommitOptions, DispatchOptions, Store as VuexStore } from 'vuex'
import { Actions, authActions } from './auth.actions'
import { authMutations, Mutations } from './auth.mutations'
import { authState, State } from './auth.state'

export const authStore = {
  state: authState,
  mutations: authMutations,
  actions: authActions
}

export type AuthStore = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}
// & {
//   getters: {
//     [K in keyof Getters]: ReturnType<Getters[K]>
//   }
// }

export * from './types'
export * from './auth.actions'
export * from './auth.mutations'
