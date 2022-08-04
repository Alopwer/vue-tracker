import { ActionContext, ActionTree } from 'vuex'
import { CoworkerActionTypes } from './action-types'
import { CoworkerMutationTypes } from './mutation-types'
import { Mutations } from './mutations'
import { State } from './state'
import { RootState } from '@/store'
import { UserApi } from '@/api/user.api'
import { Mutations as CommonMutations } from '../common/mutations'
import { CommonMutationTypes } from '../common/mutation-types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
  commit<K extends keyof CommonMutations>(
    key: K,
    payload?: Parameters<CommonMutations[K]>[1]
  ): ReturnType<CommonMutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [CoworkerActionTypes.GET_USER_CONNECTIONS](
    { commit }: AugmentedActionContext,
    payload?: string
  ): Promise<boolean>,
  [CoworkerActionTypes.GET_USERS](
    { commit }: AugmentedActionContext,
    payload?: string
  ): Promise<void>,
  [CoworkerActionTypes.SEND_CONNECTION_REQUEST](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<boolean>,
  [CoworkerActionTypes.GET_REQUESTED_CONNECTION_REQUESTS](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<boolean>,
  [CoworkerActionTypes.GET_RECEIVED_CONNECTION_REQUESTS](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<boolean>,
  [CoworkerActionTypes.DELETE_CONNECTION](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<boolean>,
  [CoworkerActionTypes.DECLINE_CONNECTION_REQUEST](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<boolean>,
  [CoworkerActionTypes.ACCEPT_CONNECTION_REQUEST](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<boolean>,
  [CoworkerActionTypes.GET_USER_BY_ID](
    { commit }: AugmentedActionContext,
    payload: string
  ): unknown
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [CoworkerActionTypes.GET_USER_CONNECTIONS] (context, username) {
    try {
      context.commit(CoworkerMutationTypes.SET_IS_LOADING, true)
      context.commit(CoworkerMutationTypes.SET_IS_LOADED, false)
      const connections = await UserApi.getConnections(username)
      context.commit(CoworkerMutationTypes.SET_USER_CONNECTIONS, connections)
      context.commit(CoworkerMutationTypes.SET_IS_LOADING, false)
      context.commit(CoworkerMutationTypes.SET_IS_LOADED, true)
      return true
    } catch (e) {
      return false
    }
  },
  async [CoworkerActionTypes.GET_USERS] (context, username) {
    try {
      context.commit(CoworkerMutationTypes.SET_IS_LOADING, true)
      context.commit(CoworkerMutationTypes.SET_IS_LOADED, false)
      const users = await UserApi.getUsersByUserName(username)
      context.commit(CoworkerMutationTypes.SET_USERS, users)
      context.commit(CoworkerMutationTypes.SET_IS_LOADING, false)
      context.commit(CoworkerMutationTypes.SET_IS_LOADED, true)
    } catch (e) {}
  },
  async [CoworkerActionTypes.SEND_CONNECTION_REQUEST] (context, userId) {
    try {
      await UserApi.sendConnectionRequest(userId)
      context.commit(CoworkerMutationTypes.UPDATE_USERS, userId)
      await context.dispatch(CoworkerActionTypes.GET_REQUESTED_CONNECTION_REQUESTS)
      return true
    } catch (e) {
      return false
    }
  },
  async [CoworkerActionTypes.GET_REQUESTED_CONNECTION_REQUESTS] (context, username) {
    try {
      const connectionRequests = await UserApi.getUserRequestedConnectionRequests(username)
      context.commit(CoworkerMutationTypes.SET_REQUESTED_CONNECTION_REQUESTS, connectionRequests)
      return true
    } catch (e) {
      return false
    }
  },
  async [CoworkerActionTypes.GET_RECEIVED_CONNECTION_REQUESTS] (context, username) {
    try {
      const connectionRequests = await UserApi.getUserReceivedConnectionRequests(username)
      context.commit(CoworkerMutationTypes.SET_RECEIVED_CONNECTION_REQUESTS, connectionRequests)
      return true
    } catch (e) {
      return false
    }
  },
  async [CoworkerActionTypes.DELETE_CONNECTION] (context, userId) {
    try {
      await UserApi.deleteConnection(userId)
      context.commit(CoworkerMutationTypes.UPDATE_USER_CONNECTIONS, userId)
      return true
    } catch (e) {
      return false
    }
  },
  async [CoworkerActionTypes.DECLINE_CONNECTION_REQUEST] (context, userId) {
    try {
      await UserApi.deleteConnection(userId)
      context.commit(CoworkerMutationTypes.UPDATE_REQUESTED_CONNECTION_REQUESTS, userId)
      return true
    } catch (e) {
      return false
    }
  },
  async [CoworkerActionTypes.ACCEPT_CONNECTION_REQUEST] (context, userId) {
    try {
      await UserApi.acceptConnectionRequest(userId)
      context.commit(CoworkerMutationTypes.UPDATE_RECEIVED_CONNECTION_REQUESTS, userId)
      await context.dispatch(CoworkerActionTypes.GET_USER_CONNECTIONS)
      return true
    } catch (e) {
      return false
    }
  },
  async [CoworkerActionTypes.GET_USER_BY_ID] (context, userId) {
    const user = await UserApi.getUserById(userId)
      .then(user => context.commit(CoworkerMutationTypes.SET_CACHED_USER, user))
      .catch((e: string) => context.commit(CommonMutationTypes.SET_ERROR, e))
    return user
  }
}
