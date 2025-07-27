import type { BunRequest } from 'bun';
import app from './client/index.html';
import { handleCache } from './lib/cache';
import { getGame } from './lib/getGame';
import { search } from './lib/search';

const server = Bun.serve({
	port: process.env.PORT ?? 3000,
	routes: {
		'/*': app,
		'/api/games/:id': {
			GET: async (req: BunRequest & { params: { id: string } }) => {
				const { id } = req.params;

				return handleCache('games', 'bgg_id', id, () => getGame(id));
			},
		},
		'/api/search/:query': {
			GET: async (req: BunRequest & { params: { query: string } }) => {
				const { query } = req.params;

				return handleCache('searches', 'query', query, () => search(query));
			},
		},
	},
});

console.log(`Now listening at http://${server.hostname}:${server.port}/`);
