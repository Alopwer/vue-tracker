import { Workspace, WorkspaceRequest } from '@/api/workspace.api'
import { MutationTree } from 'vuex'
import { WorkspaceMutationTypes } from './mutation-types'
import { State } from './state'

export type Mutations<S = State> = {
  [WorkspaceMutationTypes.SET_WORKSPACES](state: S, payload: Workspace[]): void;
  [WorkspaceMutationTypes.SET_SHARED_WORKSPACES](state: S, payload: Workspace[]): void;
  [WorkspaceMutationTypes.SET_OWNERS_WORKSPACES_LOADING](state: S, payload: boolean): void;
  [WorkspaceMutationTypes.SET_OWNERS_WORKSPACES_LOADED](state: S, payload: boolean): void;
  [WorkspaceMutationTypes.SET_SHARED_WORKSPACES_LOADING](state: S, payload: boolean): void;
  [WorkspaceMutationTypes.SET_SHARED_WORKSPACES_LOADED](state: S, payload: boolean): void;
  [WorkspaceMutationTypes.SET_WORKSPACE_SHARE_CODE](state: S, payload: string | null): void;
  [WorkspaceMutationTypes.SET_USER_WORKSPACE_REQUESTS](state: S, payload: WorkspaceRequest[]): void;
  [WorkspaceMutationTypes.REMOVE_WORKSPACE_REQUEST](state: S, payload: string): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [WorkspaceMutationTypes.SET_WORKSPACES] (state, workspaces) {
    state.workspaces.personal = workspaces
  },
  [WorkspaceMutationTypes.SET_SHARED_WORKSPACES] (state, workspaces) {
    state.workspaces.shared = workspaces
  },
  [WorkspaceMutationTypes.SET_OWNERS_WORKSPACES_LOADING] (state, value) {
    state.loadingState.ownersWorkspaces.isLoading = value
  },
  [WorkspaceMutationTypes.SET_OWNERS_WORKSPACES_LOADED] (state, value) {
    state.loadingState.ownersWorkspaces.isLoaded = value
  },
  [WorkspaceMutationTypes.SET_SHARED_WORKSPACES_LOADING] (state, value) {
    state.loadingState.sharedWorkspaces.isLoading = value
  },
  [WorkspaceMutationTypes.SET_SHARED_WORKSPACES_LOADED] (state, value) {
    state.loadingState.sharedWorkspaces.isLoaded = value
  },
  [WorkspaceMutationTypes.SET_WORKSPACE_SHARE_CODE] (state, value) {
    state.workspaceShareCode = value
  },
  [WorkspaceMutationTypes.SET_USER_WORKSPACE_REQUESTS] (state, value) {
    state.workspaceRequests = value
  },
  [WorkspaceMutationTypes.REMOVE_WORKSPACE_REQUEST] (state, value) {
    state.workspaceRequests = state.workspaceRequests.filter(request => request.workspaceId !== value)
  }
}
