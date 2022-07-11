/* eslint-disable */
import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { State } from './state'
import { Workspace } from '@/api/workspace.api'

export type Getters = {
  getWorkspaceById(state: State): (id: string) => Workspace | undefined;
  getLoadingState(state: State): { isLoaded: boolean, isLoading: boolean };
}

export const getters: GetterTree<State, RootState> & Getters = {
  getWorkspaceById: (state) => (id) => {
    let foundWorkspace: Workspace | undefined;
    foundWorkspace = state.workspaces.personal.find(w => w.workspaceId === id)
    if (!foundWorkspace) {
      foundWorkspace = state.workspaces.shared.find(w => w.workspaceId === id)
    }
    return foundWorkspace
  },
  getLoadingState: (state) => {
    const {
      isLoaded: ownersWorkspacesLoaded,
      isLoading: ownersWorkspacesLoading
    } = state.loadingState.ownersWorkspaces
    const {
      isLoaded: sharedWorkspacesLoaded,
      isLoading: sharedWorkspacesLoading
    } = state.loadingState.sharedWorkspaces
    return {
      isLoaded: ownersWorkspacesLoaded && sharedWorkspacesLoaded,
      isLoading: ownersWorkspacesLoading ||  sharedWorkspacesLoading
    }
  }
}
