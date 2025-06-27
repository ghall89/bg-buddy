import convert from 'xml-js';

export default class BoardGameGeekClient {
  BASE_URL: string;

  constructor() {
    this.BASE_URL = 'https://boardgamegeek.com' as const;
  }

  async search(query: string): Promise<BoardGame[] | undefined> {
    const path = `/xmlapi2/search?query=${query}`;

    const response = await this.getRequest(path);

    return this.parseResults(response);
  }

  async gameById(id: string) {
    const path = `/xmlapi/boardgame/${id}`;

    const response = await this.getRequest(path);

    return this.parseGameData(response);
  }

  private async getRequest(path: string): Promise<Response> {
    const url = `${this.BASE_URL}${path}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return response;
  }

  private async parseResults(
    response: Response,
  ): Promise<BggSearchResponse | undefined> {
    const resultsArray: BggSearchResponse = [];

    try {
      const xml = await response.text();
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

  private async parseGameData(response: Response): Promise<BggDetailsResponse> {
    let gameData: BggDetailsResponse;

    try {
      const xml = await response.text();

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

export type BggSearchResponse = BoardGame[];
export type BggDetailsResponse = GameDetails;

export interface BoardGame {
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
