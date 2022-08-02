import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { State } from './state'
// eslint-disable-next-line
export type Getters = {}

export const getters: GetterTree<State, RootState> & Getters = {}
