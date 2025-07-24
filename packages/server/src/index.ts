import type { BunRequest } from 'bun';
import { getGame } from './lib/getGame';
import { handleCache } from './lib/cache';

const PORT = process.env.PORT ?? 4000;

Bun.serve({
  port: PORT,
  routes: {
    '/': new Response('Hello World'),
    '/games/:id': {
      GET: async (req: BunRequest) =>
        handleCache('games', req.params.id, () => getGame(req.params.id)),
    },
  },
});

console.log(`Now listening at http://localhost:${PORT}/`);
