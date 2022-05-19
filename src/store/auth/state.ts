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

export type State = typeof state
