import { User } from '@/api/user.api'
import { Workspace } from '@/api/workspace.api'
import { MutationTree } from 'vuex'
import { WorkspaceMutationTypes } from './mutation-types'
import { State } from './state'

export type Mutations<S = State> = {
  [WorkspaceMutationTypes.SET_WORKSPACES](state: S, payload: Workspace[]): void;
  [WorkspaceMutationTypes.SET_WORKSPACES_LOADING](state: S, payload: boolean): void;
  [WorkspaceMutationTypes.SET_WORKSPACES_LOADED](state: S, payload: boolean): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [WorkspaceMutationTypes.SET_WORKSPACES] (state, workspaces) {
    state.workspaces.personal = workspaces
  },
  [WorkspaceMutationTypes.SET_WORKSPACES_LOADING] (state, value) {
    state.isLoading = value
  },
  [WorkspaceMutationTypes.SET_WORKSPACES_LOADED] (state, value) {
    state.isLoaded = value
  }
}
