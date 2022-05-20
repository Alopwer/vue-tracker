import { EMPTY_ERROR } from '@/constants'
import { ActionContext, ActionTree } from 'vuex'
import { CoworkerActionTypes } from './action-types'
import { CoworkerMutationTypes } from './mutation-types'
import { Mutations } from './mutations'
import { State } from './state'
import { RootState } from '@/store'
import { UserApi } from '@/api/user.api'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [CoworkerActionTypes.GET_USER_CONNECTIONS](
    { commit }: AugmentedActionContext,
    payload?: string
  ): Promise<void>
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [CoworkerActionTypes.GET_USER_CONNECTIONS] (context, username) {
    try {
      const connections = await UserApi.getUsersConnections(username)
      context.commit(CoworkerMutationTypes.SET_USER_CONNECTIONS, connections)
    } catch (e) {}
  }
}
