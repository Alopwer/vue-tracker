import { CommitOptions, DispatchOptions, Module, Store as VuexStore } from 'vuex'
import { Actions, actions } from './actions'
import { mutations, Mutations } from './mutations'
import { state, State } from './state'
import { RootState } from '@/store'
import { getters, Getters } from './getters'

export type { State } from './state'

export type CoworkerStore<S = State> = Omit<
  VuexStore<S>,
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
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

export const store: Module<State, RootState> = {
  state,
  mutations,
  actions,
  getters
}
