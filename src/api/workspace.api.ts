import axios from 'axios'
import { Collection } from './collection.api'
import { User } from './user.api'

export type CreateWorkspaceDto = {
  title: string;
  coworkers: string[];
  imageObject: File | null;
}

export type Workspace = {
  title: string;
  workspaceId: string;
  coworkers: User[];
}

export type WorkspaceRequest = {
  title: string;
  ownerId: string;
  workspaceId: string;
}

export class WorkspaceApi {
  private static readonly baseName: string = '/workspaces'
  public static readonly workspaceApiUrl: string = `${this.baseName}`

  static async getOwnersWorkspaces (): Promise<Workspace[]> {
    return axios.get(`${this.workspaceApiUrl}`)
  }

  static async getSharedWorkspaces (): Promise<Workspace[]> {
    return axios.get(`${this.workspaceApiUrl}/shared`)
  }

  static async createWorkspace (data: CreateWorkspaceDto): Promise<Workspace> {
    const formData = new FormData()
    formData.append('title', data.title)
    if (data.coworkers.length) {
      data.coworkers.forEach(coworkerId => formData.append('coworkers[]', coworkerId))
    }
    if (data.imageObject) {
      formData.append('imageObject', data.imageObject)
    }
    return axios.post(`${this.workspaceApiUrl}`, formData)
  }

  static async getWorkspaceShareCode ({ workspaceId }: { workspaceId: string }): Promise<string> {
    return axios.get(`${this.workspaceApiUrl}/${workspaceId}/link`)
  }

  static async addWorkspaceByShareCode ({ workspaceShareCode }: { workspaceShareCode: string }): Promise<string> {
    return axios.post(`/relations${this.workspaceApiUrl}?workspaceShareCode=${workspaceShareCode}`)
  }

  static async getUserWorkspacesRequests (): Promise<WorkspaceRequest[]> {
    return axios.get(`/relations${this.workspaceApiUrl}/pending`)
  }

  static async acceptWorkspaceRequest (workspaceId: string): Promise<WorkspaceRequest[]> {
    return axios.put(`/relations${this.workspaceApiUrl}/${workspaceId}`)
  }

  static async declineWorkspaceRequest (workspaceId: string): Promise<WorkspaceRequest[]> {
    return axios.delete(`/relations${this.workspaceApiUrl}/${workspaceId}`)
  }
}
