import { MutationTree } from 'vuex'
import { ILogInResponse, IError } from './types'
import { AuthMutationTypes } from './mutation-types'
import { defaultUserState, State } from './state'

export type Mutations<S = State> = {
  [AuthMutationTypes.SET_IS_LOGGED_IN](state: S, payload: boolean): void
  [AuthMutationTypes.SET_USER](state: S, payload: ILogInResponse): void
  [AuthMutationTypes.SET_LOGGED_IN_ERROR](state: S, payload: IError): void
  [AuthMutationTypes.SET_SIGN_UP_ERROR](state: S, payload: IError): void
  [AuthMutationTypes.RESET_USER](state: S): void
  [AuthMutationTypes.SET_IS_LOADING](state: S, payload: boolean): void
  [AuthMutationTypes.SET_IS_LOADED](state: S, payload: boolean): void
  [AuthMutationTypes.SET_SIGN_UP_FULLFILLED](state: S, payload: boolean): void
}

export const mutations: MutationTree<State> & Mutations = {
  [AuthMutationTypes.SET_IS_LOGGED_IN] (state, payload) {
    state.common.isLoggedIn = payload
  },
  [AuthMutationTypes.SET_USER] (state, payload) {
    state.user = payload
  },
  [AuthMutationTypes.SET_LOGGED_IN_ERROR] (state, payload) {
    state.errors.logIn = {
      message: payload.message
    }
  },
  [AuthMutationTypes.SET_SIGN_UP_ERROR] (state, payload) {
    state.errors.signUp = {
      message: payload.message
    }
  },
  [AuthMutationTypes.RESET_USER] (state) {
    state.user = defaultUserState
  },
  [AuthMutationTypes.SET_IS_LOADING] (state, payload) {
    state.common.isLoading = payload
  },
  [AuthMutationTypes.SET_IS_LOADED] (state, payload) {
    state.common.isLoaded = payload
  },
  [AuthMutationTypes.SET_SIGN_UP_FULLFILLED] (state, payload) {
    state.signUp.fullfilled = payload
  }
}
