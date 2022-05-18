export const defaultUserState = {
  username: '',
  userId: '',
  email: ''
}

export const authState = {
  common: {
    isLoggedIn: false,
    isLoading: false,
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

export type State = typeof authState
