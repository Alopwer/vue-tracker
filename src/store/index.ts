import { createStore } from 'vuex'
import * as authModule from './auth/auth.store'

const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})

store.registerModule('auth', authModule.authStore)

export default store

export * from './auth/auth.store'
export * from './action-types'
export * from './mutation-types'
