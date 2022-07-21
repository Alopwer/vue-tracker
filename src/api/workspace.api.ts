import axios from 'axios'
import { Collection } from './collection.api'
import { User } from './user.api'

export type CreateWorkspaceDto = {
  title: string;
  coworkers: string[];
}

export type CreateWorkspaceCollectionDto = {
  title: string;
  description: string;
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

  static async getWorkspaceCollections (workspaceId: string): Promise<Collection[]> {
    return axios.get(`${this.workspaceApiUrl}/${workspaceId}/collections`)
  }

  static async createWorkspaceCollection (workspaceId: string, data: CreateWorkspaceCollectionDto): Promise<Collection[]> {
    return axios.post(`${this.workspaceApiUrl}/${workspaceId}/collections`, data)
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
