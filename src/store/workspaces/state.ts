import { Card } from '@/api/card.api'
import { Workspace, WorkspaceRequest } from '@/api/workspace.api'

export const state = {
  workspaces: {
    personal: [],
    shared: []
  },
  loadingState: {
    sharedWorkspaces: {
      isLoading: false,
      isLoaded: false
    },
    ownersWorkspaces: {
      isLoading: false,
      isLoaded: false
    }
  },
  workspaceRequests: [],
  workspaceShareCode: '',
  selectedWorkspaceCards: []
}

export type State = {
  workspaces: {
    personal: Workspace[],
    shared: Workspace[]
  },
  loadingState: {
    sharedWorkspaces: {
      isLoading: boolean,
      isLoaded: boolean,
    },
    ownersWorkspaces: {
      isLoading: boolean,
      isLoaded: boolean,
    }
  },
  workspaceRequests: WorkspaceRequest[],
  workspaceShareCode: string | null,
  selectedWorkspaceCards: Card[]
}
