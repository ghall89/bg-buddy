'use server';

import BoardGameGeekClient from '@/lib/clients/bgg-client';

export async function handleSearch(query: string) {
  const bgg = new BoardGameGeekClient();

  try {
    const results = await bgg.search(query);

    return results;
  } catch (error) {
    throw error;
  }
}
