import axios from 'axios'
import { User } from './user.api'

export type CreateWorkspaceDto = {
  title: string;
  coworkers: string[];
}

export type Workspace = {
  title: string;
  workspaceId: string;
  coworkers: User[];
}

export class WorkspaceApi {
  private static readonly baseName: string = '/workspaces'
  private static readonly workspaceApiUrl: string = `${this.baseName}`

  static async getOwnersWorkspaces (): Promise<Workspace[]> {
    return axios.get(`${this.workspaceApiUrl}`)
  }

  static async getSharedWorkspaces (): Promise<Workspace[]> {
    return axios.get(`${this.workspaceApiUrl}/shared`)
  }

  static async createWorkspace (data: CreateWorkspaceDto): Promise<Workspace> {
    return axios.post(`${this.workspaceApiUrl}`, data)
  }

  static async getWorkspaceShareCode ({ workspaceId }: { workspaceId: string }): Promise<string> {
    return axios.get(`${this.workspaceApiUrl}/${workspaceId}/link`)
  }

  static async addWorkspaceByShareCode ({ workspaceShareCode }: { workspaceShareCode: string }): Promise<string> {
    return axios.post(`/relations${this.workspaceApiUrl}?workspaceShareCode=${workspaceShareCode}`)
  }
}
