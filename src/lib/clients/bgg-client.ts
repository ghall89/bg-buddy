import convert from 'xml-js';

export default class BoardGameGeekClient {
  baseUrl: string;

  constructor() {
    this.baseUrl = 'https://boardgamegeek.com';
  }

  async search(query: string): Promise<BoardGame[] | undefined> {
    const path = `/xmlapi2/search?query=${query}`;

    const res = await this.getRequest(path);

    return this.parseResults(res);
  }

  async gameById(id: string) {
    const path = `/xmlapi2/search?thing=${id}`;

    const res = await this.getRequest(path);

    return this.parseGameData(res);
  }

  private async getRequest(path: string): Promise<Response> {
    const url = `${this.baseUrl}${path}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return response;
  }

  private async parseResults(
    response: Response,
  ): Promise<BggSearchResponse | undefined> {
    const resultsArr: BggSearchResponse = [];

    try {
      const xml = await response.text();
      const obj = convert.xml2js(xml) as BoardGameXml;

      const elements = obj.elements?.[0]?.elements || [];

      elements.forEach((el) => {
        const title = el.elements.find((e) => e.name === 'name');

        if (!title) return;

        resultsArr.push({
          bggId: el.attributes.id,
          title: title.attributes.value,
          url: `${this.baseUrl}/boardgame/${el.attributes.id}`,
        });
      });
    } catch (error) {
      return;
    }

    return resultsArr;
  }

  private async parseGameData(response: Response): Promise<BggDetailsResponse> {
    let gameData: BggDetailsResponse;

    try {
      const xml = await response.text();

      const result = convert.xml2js(xml, { compact: true }) as GameDetailsXml;

      gameData = {
        bggId: result?.items?.item?._attributes?.objectid,
        title: result?.items?.item.name?._text,
        img: result?.items?.item?.thumbnail?._text,
        description: result?.items?.item?.description?._text,
        minPlayers: result?.items?.item?.minplayers?._attributes?.value
          ? parseInt(result.items.item.minplayers._attributes.value)
          : undefined,
        maxPlayers: result?.items?.item?.maxplayers?._attributes?.value
          ? parseInt(result.items.item.maxplayers._attributes.value)
          : undefined,
        avgPlaytime: result?.items?.item?.playingtime?._attributes?.value
          ? parseInt(result.items.item.playingtime._attributes.value)
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
  items: {
    item: {
      _attributes: {
        objectid: string;
      };
      name: {
        _text: string;
      };
      thumbnail: {
        _text: string;
      };
      description: {
        _text: string;
      };
      minplayers: {
        _attributes: {
          value: string;
        };
      };
      maxplayers: {
        _attributes: {
          value: string;
        };
      };
      playingtime: {
        _attributes: {
          value: string;
        };
      };
    };
  };
}
