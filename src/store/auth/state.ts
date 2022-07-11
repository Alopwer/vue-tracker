import { User } from '@/api/user.api'

export const defaultUserState = {
  username: '',
  userId: '',
  email: ''
}

export const state = {
  common: {
    isLoggedIn: false,
    isLoading: true,
    isLoaded: false
  },
  signUp: {
    fullfilled: false
  },
  user: defaultUserState,
  errors: {
    logIn: {
      message: []
    },
    signUp: {
      message: []
    }
  }
}

export type State = {
  common: {
    isLoggedIn: boolean,
    isLoading: boolean,
    isLoaded: boolean
  },
  signUp: {
    fullfilled: boolean
  },
  user: User,
  errors: {
    logIn: {
      message: string[]
    },
    signUp: {
      message: string[]
    }
  }
}
