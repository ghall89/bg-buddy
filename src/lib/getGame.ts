import { gameById } from 'bgg-client';

export async function getGame(id: string) {
	const game = await gameById(id, { stats: true });

	return JSON.stringify(game);
}
