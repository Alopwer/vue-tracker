import { User } from '@/api/user.api'

export const state = {
  connections: [] as User[]
}

export type State = typeof state
