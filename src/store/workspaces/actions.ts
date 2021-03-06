import { ActionContext, ActionTree } from 'vuex'
import { WorkspaceActionTypes } from './action-types'
import { WorkspaceMutationTypes } from './mutation-types'
import { Mutations } from './mutations'
import { Mutations as CommonMutations } from '../common/mutations'
import { State } from './state'
import { RootState } from '@/store'
import { CreateWorkspaceDto, WorkspaceApi } from '@/api/workspace.api'
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
  [WorkspaceActionTypes.CREATE_WORKSPACE](
    { commit }: AugmentedActionContext,
    payload: CreateWorkspaceDto
  ): Promise<boolean>,
  [WorkspaceActionTypes.GET_OWNERS_WORKSPACES](
    { commit }: AugmentedActionContext
  ): Promise<boolean>,
  [WorkspaceActionTypes.GET_SHARED_WORKSPACES](
    { commit }: AugmentedActionContext
  ): Promise<boolean>,
  [WorkspaceActionTypes.GET_WORKSPACE_SHARE_CODE](
    { commit }: AugmentedActionContext,
    payload: { workspaceId: string }
  ): Promise<unknown>,
  [WorkspaceActionTypes.ADD_WORKSPACE_BY_SHARE_CODE](
    { commit }: AugmentedActionContext,
    payload: { workspaceShareCode: string }
  ): Promise<unknown>,
  [WorkspaceActionTypes.GET_USER_WORKSPACES_REQUESTS](
    { commit }: AugmentedActionContext
  ): Promise<unknown>,
  [WorkspaceActionTypes.ACCEPT_WORKSPACE_REQUEST](
    { commit }: AugmentedActionContext,
    payload: { workspaceId: string }
  ): Promise<unknown>,
  [WorkspaceActionTypes.DECLINE_WORKSPACE_REQUEST](
    { commit }: AugmentedActionContext,
    payload: { workspaceId: string }
  ): Promise<unknown>
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
      context.commit(WorkspaceMutationTypes.SET_OWNERS_WORKSPACES_LOADING, true)
      const workspaces = await WorkspaceApi.getOwnersWorkspaces()
      context.commit(WorkspaceMutationTypes.SET_WORKSPACES, workspaces)
      context.commit(WorkspaceMutationTypes.SET_OWNERS_WORKSPACES_LOADING, false)
      context.commit(WorkspaceMutationTypes.SET_OWNERS_WORKSPACES_LOADED, true)
      return true
    } catch (e) {
      return false
    }
  },
  async [WorkspaceActionTypes.GET_SHARED_WORKSPACES] (context) {
    try {
      context.commit(WorkspaceMutationTypes.SET_SHARED_WORKSPACES_LOADING, true)
      const workspaces = await WorkspaceApi.getSharedWorkspaces()
      context.commit(WorkspaceMutationTypes.SET_SHARED_WORKSPACES, workspaces)
      context.commit(WorkspaceMutationTypes.SET_SHARED_WORKSPACES_LOADING, false)
      context.commit(WorkspaceMutationTypes.SET_SHARED_WORKSPACES_LOADED, true)
      return true
    } catch (e) {
      return false
    }
  },
  async [WorkspaceActionTypes.GET_ALL_WORKSPACES] (context) {
    try {
      context.dispatch(WorkspaceActionTypes.GET_OWNERS_WORKSPACES)
      context.dispatch(WorkspaceActionTypes.GET_SHARED_WORKSPACES)
      return true
    } catch (e) {
      return false
    }
  },
  async [WorkspaceActionTypes.GET_WORKSPACE_SHARE_CODE] (context, data) {
    try {
      context.commit(WorkspaceMutationTypes.SET_WORKSPACE_SHARE_CODE, null)
      const workspaceShareCode = await WorkspaceApi.getWorkspaceShareCode(data)
      context.commit(WorkspaceMutationTypes.SET_WORKSPACE_SHARE_CODE, workspaceShareCode)
    } catch (e) {}
  },
  [WorkspaceActionTypes.ADD_WORKSPACE_BY_SHARE_CODE] (context, data) {
    return WorkspaceApi.addWorkspaceByShareCode(data)
      .catch((err: string) => {
        context.commit(CommonMutationTypes.SET_ERROR, err)
      })
  },
  async [WorkspaceActionTypes.GET_USER_WORKSPACES_REQUESTS] (context) {
    try {
      const workspaceRequests = await WorkspaceApi.getUserWorkspacesRequests()
      context.commit(WorkspaceMutationTypes.SET_USER_WORKSPACE_REQUESTS, workspaceRequests)
    } catch (e) {}
  },
  async [WorkspaceActionTypes.ACCEPT_WORKSPACE_REQUEST] (context, data) {
    try {
      await WorkspaceApi.acceptWorkspaceRequest(data.workspaceId)
      context.commit(WorkspaceMutationTypes.REMOVE_WORKSPACE_REQUEST, data.workspaceId)
      context.dispatch(WorkspaceActionTypes.GET_SHARED_WORKSPACES)
    } catch (e) {}
  },
  async [WorkspaceActionTypes.DECLINE_WORKSPACE_REQUEST] (context, data) {
    try {
      await WorkspaceApi.declineWorkspaceRequest(data.workspaceId)
      context.commit(WorkspaceMutationTypes.REMOVE_WORKSPACE_REQUEST, data.workspaceId)
      context.dispatch(WorkspaceActionTypes.GET_SHARED_WORKSPACES)
    } catch (e) {}
  }
}
