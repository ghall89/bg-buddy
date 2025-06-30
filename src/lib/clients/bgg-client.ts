import convert from 'xml-js';

import { tryCatch } from '../helpers/try-catch';
import type {
  BggDetailsResponse,
  BggSearchResponse,
  BoardGameXml,
  GameDetailsXml,
  SearchResult,
} from '../types/board-game-geek';

export default class BoardGameGeekClient {
  BASE_URL = 'https://boardgamegeek.com';

  /**
   * Search the BGG API for the given query and return an array of results.
   */
  async search(query: string): Promise<SearchResult[] | undefined> {
    const path = `/xmlapi2/search?query=${query}`;

    const response = await tryCatch(
      () => this.getRequest(path),
      'Error searching BGG API',
    );

    return this.parseXmlResponse(response as Response, this.parseResults);
  }

  /**
   * Fetch a board game from BGG API by its ID and return the response
   */
  async gameById(id: string) {
    const path = `/xmlapi/boardgame/${id}`;

    const response = await tryCatch(
      () => this.getRequest(path),
      'Error fetching game via API by ID',
    );

    return this.parseXmlResponse(response as Response, this.parseGameData);
  }

  /**
   * Handle request to the BGG API
   */
  private async getRequest(path: string): Promise<Response> {
    const url = `${this.BASE_URL}${path}`;

    console.info('URL:', url);

    const response = await fetch(url);

    if (!response?.ok) {
      throw new Error(`Response status: ${response?.status}`);
    }

    return response as Response;
  }

  /**
   * Parses an XML HTTP response using a custom parsing function.
   */
  private async parseXmlResponse<T>(
    response: Response,
    parseFn: (xml: string) => T,
  ): Promise<T> {
    const xml = await tryCatch(() => response.text(), 'Error parsing XML');

    return parseFn(xml as string);
  }

  /**
   * Parses a BGG XML search response into a list of game search results.
   */
  private async parseResults(
    xml: string,
  ): Promise<BggSearchResponse | undefined> {
    const resultsArray: BggSearchResponse = [];

    try {
      const object = convert.xml2js(xml) as BoardGameXml;

      const elements = object.elements?.[0]?.elements || [];

      for (const element of elements) {
        const title = element.elements.find(({ name }) => name === 'name');

        if (!title) return;

        resultsArray.push({
          bggId: element.attributes.id,
          title: title.attributes.value,
        });
      }
    } catch (error) {
      throw error;
    }

    return resultsArray;
  }

  /**
   * Parses a BGG XML board game response into structured game data.
   */
  private async parseGameData(xml: string): Promise<BggDetailsResponse> {
    let gameData: BggDetailsResponse;

    try {
      const result = convert.xml2js(xml, { compact: true }) as GameDetailsXml;

      const {
        boardgames: { boardgame },
      } = result;

      gameData = {
        bggId: boardgame?._attributes?.objectid,
        title: Array.isArray(boardgame.name)
          ? boardgame?.name?.find(
              (name) => name._attributes?.primary === 'true',
            )?._text
          : boardgame.name?._text,
        img: boardgame?.image?._text,
        description: boardgame?.description?._text,
        minPlayers: boardgame?.minplayers?._text
          ? Number(boardgame.minplayers._text)
          : undefined,
        maxPlayers: boardgame?.maxplayers?._text
          ? Number(boardgame.maxplayers._text)
          : undefined,
        avgPlaytime: boardgame?.playingtime?._text
          ? Number(boardgame.playingtime._text)
          : undefined,
      };
    } catch (error) {
      throw error;
    }

    return gameData;
  }
}
