import { search as bggSearch } from 'bgg-client';

export async function search(query: string) {
  try {
    const results = await bggSearch(query, { type: 'boardgame' });

    return JSON.stringify(results);
  } catch (error) {
    throw error;
  }
}
