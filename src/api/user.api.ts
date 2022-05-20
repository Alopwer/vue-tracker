import axios from 'axios'

export type User = {
  userId: string;
  username: string;
  email: string;
}

export class UserApi {
  private static readonly baseName: string = '/users'
  private static readonly userApiUrl: string = `${this.baseName}`
  private static readonly coworkersApiUrl: string = '/relations/coworkers'

  static async getUsersByUserName (username?: string): Promise<User[]> {
    return axios.get(`${this.userApiUrl}`, { params: { username } })
  }

  static async getConnections (username?: string): Promise<User[]> {
    const reqOptions = username ? { params: { username } } : {}
    return axios.get(`${this.coworkersApiUrl}`, reqOptions)
  }
}
