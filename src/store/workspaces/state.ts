import { User } from '@/api/user.api'
import { Workspace } from '@/api/workspace.api'

export const state = {
  workspaces: {
    personal: [],
    shared: []
  },
  isLoading: false,
  isLoaded: false
}

export type State = {
  workspaces: {
    personal: Workspace[],
    shared: Workspace[]
  },
  isLoading: boolean,
  isLoaded: boolean
}
