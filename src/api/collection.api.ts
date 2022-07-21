// import axios from 'axios'

export type CollectionData = {
  collectionDataId: string;
  description: string;
}

export type Collection = {
  collectionId: string;
  title: string;
  collectionData: CollectionData;
}

export class CollectionApi {
  // private static readonly baseName: string = '/collections'
  // private static readonly collectionApiUrl: string = `${this.baseName}`

  // static async getWorkspaceCollections (workspaceId: string): Promise<Collection[]> {
  //   return axios.get(`${this.collectionApiUrl}/${workspaceId}`)
  // }
}
