import { NextResponse } from 'next/server';

import BoardGameGeekClient from '@/lib/clients/bgg-client';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ query: string }> },
) {
  const { query } = await params;

  const bgg = new BoardGameGeekClient();

  const results = await bgg.search(query);

  return NextResponse.json(results);
}
