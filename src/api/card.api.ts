// import axios from 'axios'

export type CardData = {
  cardDataId: string;
  description: string;
}

export type Card = {
  cardId: string;
  title: string;
  cardData: CardData;
}

export class CardApi {
  // private static readonly baseName: string = '/cards'
  // private static readonly cardApiUrl: string = `${this.baseName}`

  // static async getWorkspaceCards (workspaceId: string): Promise<Card[]> {
  //   return axios.get(`${this.cardApiUrl}/${workspaceId}`)
  // }
}
