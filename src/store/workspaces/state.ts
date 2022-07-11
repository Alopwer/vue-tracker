import { User } from '@/api/user.api'
import { Workspace } from '@/api/workspace.api'

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
  workspaceShareCode: ''
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
  workspaceShareCode: string | null
}
