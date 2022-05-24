/* eslint-disable */
import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { State } from './state'
import { ListOption } from '@/common'

export type Getters = {
  userConnectionsOptions(state: State): Array<ListOption>
}

export const getters: GetterTree<State, RootState> & Getters = {
  userConnectionsOptions: (state) => state.connections.map(user => ({ label: user.username, value: user.userId }))
}
