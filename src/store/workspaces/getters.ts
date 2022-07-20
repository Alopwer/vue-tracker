/* eslint-disable */
import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { State } from './state'
import { Workspace } from '@/api/workspace.api'
import { User } from '@/api/user.api'

export type MappedWorkspaceRequest = Record<string, {
  username: string,
  requests: {
    title: string,
    workspaceId: string
  }[]
}>

export type Getters = {
  getWorkspaceById(state: State): (id: string) => Workspace | undefined;
  getLoadingState(state: State): { isLoaded: boolean, isLoading: boolean };
  getMappedWorkspaceRequests(state: State, _: any, rootState: RootState): MappedWorkspaceRequest;
}

const memoUsernamesById = (users: User[]) => {
  const cachedUsernames: Record<string, string> = {}
  return (userId: string) => {
    if (!cachedUsernames[userId]) {
      cachedUsernames[userId] = users.find(user => user.userId === userId)!.username
    }
    return cachedUsernames[userId]
  }
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
  },
  getMappedWorkspaceRequests: (state, _, rootState) => {
    const groupedRequestsByUser: MappedWorkspaceRequest = {}
    const getUsernameById = memoUsernamesById(rootState.coworkers.connections)
    state.workspaceRequests.forEach(request => {
      const requestData = { title: request.title, workspaceId: request.workspaceId }
      if (!groupedRequestsByUser[request.ownerId]) {
        groupedRequestsByUser[request.ownerId] = {
          requests: [requestData],
          username: getUsernameById(request.ownerId)
        }
        return
      }
      groupedRequestsByUser[request.ownerId].requests.push(requestData)
      groupedRequestsByUser[request.ownerId].username = getUsernameById(request.ownerId)
    })
    return groupedRequestsByUser
  }
}
