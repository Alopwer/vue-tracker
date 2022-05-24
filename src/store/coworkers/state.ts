import { User } from '@/api/user.api'

export const state = {
  connections: [],
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
  }
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
  }
}
