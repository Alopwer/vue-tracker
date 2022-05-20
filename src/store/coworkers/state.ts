import { User } from '@/api/user.api'

export const state = {
  connections: [],
  users: [],
  loadingState: {
    isLoading: false,
    isLoaded: false
  }
}

export type State = {
  connections: User[],
  users: User[],
  loadingState: {
    isLoading: boolean,
    isLoaded: boolean
  }
}
