import { User } from '@/api/user.api'

export const state = {
  // approved connections
  connections: [],
  // users in input TODO: change naming
  users: [],
  loadingState: {
    connections: {
      isLoading: false,
      isLoaded: false
    },
    requests: {
      isLoading: false,
      isLoaded: false
    }
  },
  connectionRequests: {
    requested: [],
    received: []
  },
  // all users found by navigating through application
  cachedUsers: {}
}

export type State = {
  connections: User[],
  users: User[],
  loadingState: {
    connections: {
      isLoading: boolean,
      isLoaded: boolean
    },
    requests: {
      isLoading: boolean,
      isLoaded: boolean
    }
  },
  connectionRequests: {
    requested: User[],
    received: User[]
  },
  cachedUsers: Record<string, User>
}
