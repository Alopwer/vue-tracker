import { ILogInDto, ISignUpDto } from '@/api'
import AuthApi from '@/api/auth.api'
import { EMPTY_ERROR } from '@/constants'
import { ActionContext, ActionTree } from 'vuex'
import { AuthActionTypes } from './action-types'
import { IError } from './types'
import { AuthMutationTypes } from './mutation-types'
import { Mutations } from './mutations'
import { State } from './state'
import { RootState } from '@/store'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [AuthActionTypes.LOG_IN](
    { commit }: AugmentedActionContext,
    payload: ILogInDto
  ): Promise<void>,
  [AuthActionTypes.SIGN_UP](
    { commit }: AugmentedActionContext,
    payload: ISignUpDto
  ): Promise<void>,
  [AuthActionTypes.LOG_OUT](
    { commit }: AugmentedActionContext
  ): Promise<void>,
  [AuthActionTypes.AUTHENTICATE](
    { commit }: AugmentedActionContext
  ): Promise<void>
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [AuthActionTypes.LOG_IN] (context, data) {
    try {
      const response = await AuthApi.logIn(data)
      context.commit(AuthMutationTypes.SET_USER, response)
      context.commit(AuthMutationTypes.SET_IS_LOGGED_IN, true)
      context.commit(AuthMutationTypes.SET_LOGGED_IN_ERROR, EMPTY_ERROR)
    } catch (e) {
      context.commit(AuthMutationTypes.SET_LOGGED_IN_ERROR, e as IError)
    }
  },
  async [AuthActionTypes.SIGN_UP] (context, data) {
    try {
      await AuthApi.signUp(data)
      context.commit(AuthMutationTypes.SET_SIGN_UP_ERROR, EMPTY_ERROR)
      context.commit(AuthMutationTypes.SET_SIGN_UP_FULLFILLED, true)
    } catch (e) {
      context.commit(AuthMutationTypes.SET_SIGN_UP_ERROR, e as IError)
    }
  },
  async [AuthActionTypes.LOG_OUT] (context) {
    await AuthApi.logOut()
    context.commit(AuthMutationTypes.RESET_USER)
    context.commit(AuthMutationTypes.SET_IS_LOGGED_IN, false)
  },
  async [AuthActionTypes.AUTHENTICATE] (context) {
    try {
      context.commit(AuthMutationTypes.SET_IS_LOADING, true)
      const response = await AuthApi.authenticate()
      context.commit(AuthMutationTypes.SET_USER, response)
      context.commit(AuthMutationTypes.SET_IS_LOGGED_IN, true)
    } catch (e) {} finally {
      context.commit(AuthMutationTypes.SET_IS_LOADING, false)
      context.commit(AuthMutationTypes.SET_IS_LOADED, true)
    }
  }
}
