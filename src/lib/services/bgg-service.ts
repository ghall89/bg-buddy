import BoardGameGeekClient, { BoardGame } from '../clients/bgg-client';

export default class BoardGameGeekService {
  bggClient: BoardGameGeekClient;

  constructor() {
    this.bggClient = new BoardGameGeekClient();
  }

  async search(query: string): Promise<BoardGame[] | undefined> {
    return this.bggClient.search(query);
  }

  async getGameById(id: string) {
    return this.bggClient.gameById(id);
  }
}
