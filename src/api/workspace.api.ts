import axios from 'axios'

export type CreateWorkspaceDto = {
  title: string;
  coworkers: string[];
}

export type Workspace = {
  title: string;
  workspaceId: string;
}

export class WorkspaceApi {
  private static readonly baseName: string = '/workspaces'
  private static readonly workspaceApiUrl: string = `${this.baseName}`

  static async getOwnersWorkspaces (): Promise<Workspace[]> {
    return axios.get(`${this.workspaceApiUrl}`)
  }

  static async createWorkspace (data: CreateWorkspaceDto): Promise<Workspace> {
    return axios.post(`${this.workspaceApiUrl}`, data)
  }
}
