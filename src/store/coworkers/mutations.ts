import { User } from '@/api/user.api'
import { MutationTree } from 'vuex'
import { CoworkerMutationTypes } from './mutation-types'
import { State } from './state'

export type Mutations<S = State> = {
  [CoworkerMutationTypes.SET_USER_CONNECTIONS](state: S, payload: User[]): void;
  [CoworkerMutationTypes.SET_USERS](state: S, payload: User[]): void;
  [CoworkerMutationTypes.UPDATE_USERS](state: S, payload: string): void;
  [CoworkerMutationTypes.UPDATE_USER_CONNECTIONS](state: S, payload: string): void;
  [CoworkerMutationTypes.SET_IS_LOADING](state: S, payload: boolean): void;
  [CoworkerMutationTypes.SET_IS_LOADED](state: S, payload: boolean): void;
  [CoworkerMutationTypes.SET_REQUESTED_CONNECTION_REQUESTS](state: S, payload: User[]): void;
  [CoworkerMutationTypes.UPDATE_REQUESTED_CONNECTION_REQUESTS](state: S, payload: string): void;
  [CoworkerMutationTypes.SET_RECEIVED_CONNECTION_REQUESTS](state: S, payload: User[]): void;
  [CoworkerMutationTypes.UPDATE_RECEIVED_CONNECTION_REQUESTS](state: S, payload: string): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [CoworkerMutationTypes.SET_USERS] (state, users) {
    const foundUserConnectionsIds = state.connections.map(user => user.userId)
    const connectionRequests = state.connectionRequests.requested.map(user => user.userId)
    state.users = users.filter(user => !foundUserConnectionsIds.includes(user.userId) && !connectionRequests.includes(user.userId))
  },
  [CoworkerMutationTypes.SET_USER_CONNECTIONS] (state, connections) {
    state.connections = connections
  },
  [CoworkerMutationTypes.UPDATE_USERS] (state, userId) {
    state.users = state.users.filter(user => user.userId !== userId)
  },
  [CoworkerMutationTypes.UPDATE_USER_CONNECTIONS] (state, userId) {
    state.connections = state.connections.filter(user => user.userId !== userId)
  },
  [CoworkerMutationTypes.SET_IS_LOADING] (state, payload) {
    state.loadingState.connections.isLoading = payload
  },
  [CoworkerMutationTypes.SET_IS_LOADED] (state, payload) {
    state.loadingState.connections.isLoaded = payload
  },
  [CoworkerMutationTypes.SET_REQUESTS_IS_LOADING] (state, payload) {
    state.loadingState.requests.isLoading = payload
  },
  [CoworkerMutationTypes.SET_REQUESTS_IS_LOADED] (state, payload) {
    state.loadingState.requests.isLoaded = payload
  },
  [CoworkerMutationTypes.SET_REQUESTED_CONNECTION_REQUESTS] (state, connectionRequests) {
    state.connectionRequests.requested = connectionRequests
  },
  [CoworkerMutationTypes.UPDATE_REQUESTED_CONNECTION_REQUESTS] (state, userId) {
    state.connectionRequests.requested = state.connectionRequests.requested.filter(user => user.userId !== userId)
  },
  [CoworkerMutationTypes.SET_RECEIVED_CONNECTION_REQUESTS] (state, connectionRequests) {
    state.connectionRequests.received = connectionRequests
  },
  [CoworkerMutationTypes.UPDATE_RECEIVED_CONNECTION_REQUESTS] (state, userId) {
    state.connectionRequests.received = state.connectionRequests.received.filter(user => user.userId !== userId)
  }
}
