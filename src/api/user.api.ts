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
    return axios.get(`${this.coworkersApiUrl}/approved`, reqOptions)
  }

  static async sendConnectionRequest (userId: string) {
    return axios.post(`${this.coworkersApiUrl}/${userId}`)
  }

  static async getUserRequestedConnectionRequests (username?: string): Promise<User[]> {
    const reqOptions = username ? { params: { username } } : {}
    return axios.get(`${this.coworkersApiUrl}/requested`, reqOptions)
  }

  static async getUserReceivedConnectionRequests (username?: string): Promise<User[]> {
    const reqOptions = username ? { params: { username } } : {}
    return axios.get(`${this.coworkersApiUrl}/received`, reqOptions)
  }

  static async acceptConnectionRequest (userId: string) {
    return axios.put(`${this.coworkersApiUrl}/${userId}`)
  }

  static async deleteConnection (userId: string) {
    return axios.delete(`${this.coworkersApiUrl}/${userId}`)
  }
}
