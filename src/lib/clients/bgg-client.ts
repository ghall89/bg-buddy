import convert from 'xml-js';

export default class BoardGameGeekClient {
  BASE_URL: string;

  constructor() {
    this.BASE_URL = 'https://boardgamegeek.com' as const;
  }

  /**
   * Search the BGG API for the given query and return an array of results.
   */
  async search(query: string): Promise<SearchResult[] | undefined> {
    const path = `/xmlapi2/search?query=${query}`;

    const response = await this.getRequest(path);

    return this.parseXmlResponse(response, this.parseResults);
  }

  /**
   * Fetch a board game from BGG API by its ID and return the response
   */
  async gameById(id: string) {
    const path = `/xmlapi/boardgame/${id}`;

    const response = await this.getRequest(path);

    return this.parseXmlResponse(response, this.parseGameData);
  }

  /**
   * Handle request to the BGG API
   */
  private async getRequest(path: string): Promise<Response> {
    const url = `${this.BASE_URL}${path}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return response;
  }

  /**
   * Parses an XML HTTP response using a custom parsing function.
   */
  private async parseXmlResponse<T>(
    response: Response,
    parseFn: (xml: string) => T,
  ): Promise<T> {
    try {
      const xml = await response.text();
      return parseFn(xml);
    } catch (error) {
      throw new Error(`Failed to parse XML: ${(error as Error).message}`);
    }
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
          url: `${this.BASE_URL}/boardgame/${element.attributes.id}`,
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
        title: boardgame?.name?.find(
          (name) => name._attributes?.primary === 'true',
        )?._text,
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

export type BggSearchResponse = SearchResult[];
export type BggDetailsResponse = GameDetails;

export interface SearchResult {
  bggId: string;
  title: string;
  url: string;
}
export interface GameDetails {
  bggId?: string;
  title?: string;
  img?: string;
  description?: string;
  minPlayers?: number;
  maxPlayers?: number;
  avgPlaytime?: number;
}

export interface BoardGameXml {
  elements: {
    elements: {
      attributes: {
        id: string;
      };
      elements: {
        name: string;
        attributes: {
          value: string;
        };
      }[];
    }[];
  }[];
}

export interface GameDetailsXml {
  boardgames: {
    boardgame: {
      _attributes: {
        objectid: string;
      };
      name: {
        _attributes: {
          primary?: 'true' | 'false';
        };
        _text: string;
      }[];
      thumbnail: {
        _text: string;
      };
      image: {
        _text: string;
      };
      description: {
        _text: string;
      };
      minplayers: {
        _text: string;
      };
      maxplayers: {
        _text: string;
      };
      playingtime: {
        _text: string;
      };
    };
  };
}
