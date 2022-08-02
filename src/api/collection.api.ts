import axios from 'axios'
import { WorkspaceApi } from './workspace.api'

export type CollectionData = {
  collectionDataId: string;
  description: string;
}

export type Collection = {
  collectionId: string;
  title: string;
  collectionData: CollectionData;
}

export type CreateCollectionDto = {
  title: string;
  description: string;
}

export class CollectionApi {
  private static readonly baseName: string = '/collections'
  private static readonly collectionApiUrl: string = `${this.baseName}`

  static async getCollections (workspaceId: string): Promise<Collection[]> {
    return axios.get(`${WorkspaceApi.workspaceApiUrl}/${workspaceId}/collections`)
  }

  static async createCollection (workspaceId: string, data: CreateCollectionDto): Promise<Collection[]> {
    return axios.post(`${WorkspaceApi.workspaceApiUrl}/${workspaceId}/collections`, data)
  }
}
