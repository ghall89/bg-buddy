import { search as bggSearch } from 'bgg-client';

export async function search(query: string) {
	const results = await bggSearch(query, { type: 'boardgame' });

	return JSON.stringify(results);
}
