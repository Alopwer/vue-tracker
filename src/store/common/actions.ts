import { ActionContext, ActionTree } from 'vuex'
import { Mutations } from './mutations'
import { State } from './state'
import { RootState } from '@/store'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>
// eslint-disable-next-line
export interface Actions {}

export const actions: ActionTree<State, RootState> & Actions = {}
