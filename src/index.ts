import type { BunRequest } from 'bun';
import { getGame } from './lib/getGame';
import { search } from './lib/search';
import { handleCache } from './lib/cache';

import app from './client/index.html';

const server = Bun.serve({
  port: process.env.PORT ?? 3000,
  routes: {
    '/*': app,
    '/api/games/:id': {
      GET: async (req: BunRequest & { params: { id: string } }) => {
        const { id } = req.params;

        return handleCache('games', id, () => getGame(id));
      },
    },
    '/api/search/:query': {
      GET: async (req: BunRequest & { params: { query: string } }) => {
        const { query } = req.params;

        const results = await search(query);

        return new Response(results);
      },
    },
  },
});

console.log(`Now listening at http://${server.hostname}:${server.port}/`);
