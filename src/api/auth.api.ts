import { IError, ILogInResponse } from '@/store'
import axios from 'axios'

export interface ILogInDto {
  email: string;
  password: string;
}

export interface ISignUpDto extends ILogInDto {
  username: string;
}

export default class AuthApi {
  private static readonly baseName: string = '/auth'
  private static readonly authApiUrl: string = `${this.baseName}`

  static async authenticate (): Promise<ILogInResponse> {
    return axios.get(`${this.authApiUrl}/me`)
  }

  static async logIn (data: ILogInDto): Promise<ILogInResponse> {
    return axios.post(`${this.authApiUrl}/log-in`, data)
  }

  static async signUp (data: ISignUpDto) {
    return axios.post(`${this.authApiUrl}/register`, data)
  }

  static async logOut () {
    await axios.post(`${this.authApiUrl}/log-out`)
  }

  static async refreshToken () {
    await axios.get(`${this.authApiUrl}/refresh-token`)
  }
}
