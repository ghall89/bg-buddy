import type { BunRequest } from 'bun';
import { getGame } from './lib/getGame';
import { handleCache } from './lib/cache';

import app from './client/index.html';

const server = Bun.serve({
  port: process.env.PORT ?? 3000,
  routes: {
    '/': app,
    '/games/:id': {
      GET: async (req: BunRequest & { params: { id: string } }) => {
        const { id } = req.params;

        return handleCache('games', id, () => getGame(id));
      },
    },
  },
});

console.log(`Now listening at http://${server.hostname}:${server.port}/`);
