import { NextResponse } from 'next/server';

import BoardGameGeekClient from '@/lib/clients/bgg-client';

export async function GET(
  req: Request,
  { params }: { params: { query: string } },
) {
  const { query } = params;

  const bgg = new BoardGameGeekClient();

  const results = await bgg.search(query);

  return NextResponse.json(results);
}
