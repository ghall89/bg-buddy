import { search } from 'bgg-client';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ query: string }> },
) {
  try {
    const { query } = await params;

    const results = await search(query);

    if (!results) {
      return NextResponse.json(
        { error: 'Invalid search results from BGG' },
        { status: 502 },
      );
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Failed to handle GET /api/search/[query]:', error);
    return NextResponse.json(
      { error: 'Error while perfoming search' },
      { status: 500 },
    );
  }
}
