import { EMPTY_ERROR } from '@/constants'
import { ActionContext, ActionTree } from 'vuex'
import { WorkspaceActionTypes } from './action-types'
import { WorkspaceMutationTypes } from './mutation-types'
import { Mutations } from './mutations'
import { State } from './state'
import { RootState } from '@/store'
import { UserApi } from '@/api/user.api'
import { CreateWorkspaceDto, WorkspaceApi } from '@/api/workspace.api'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [WorkspaceActionTypes.CREATE_WORKSPACE](
    { commit }: AugmentedActionContext,
    payload: CreateWorkspaceDto
  ): Promise<boolean>,
  [WorkspaceActionTypes.GET_OWNERS_WORKSPACES](
    { commit }: AugmentedActionContext
  ): Promise<boolean>
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [WorkspaceActionTypes.CREATE_WORKSPACE] (context, data) {
    try {
      await WorkspaceApi.createWorkspace(data)
      await context.dispatch(WorkspaceActionTypes.GET_OWNERS_WORKSPACES)
      return true
    } catch (e) {
      return false
    }
  },
  async [WorkspaceActionTypes.GET_OWNERS_WORKSPACES] (context) {
    try {
      context.commit(WorkspaceMutationTypes.SET_WORKSPACES_LOADING, true)
      const workspaces = await WorkspaceApi.getOwnersWorkspaces()
      context.commit(WorkspaceMutationTypes.SET_WORKSPACES, workspaces)
      context.commit(WorkspaceMutationTypes.SET_WORKSPACES_LOADING, false)
      context.commit(WorkspaceMutationTypes.SET_WORKSPACES_LOADED, true)
      return true
    } catch (e) {
      return false
    }
  }
}
