import { Collection } from '@/api/collection.api'

export const state = {
  collections: [],
  loadingState: {
    isLoaded: false,
    isLoading: false
  }
}

export type State = {
  collections: Collection[],
  loadingState: {
    isLoaded: boolean,
    isLoading: boolean
  }
}
