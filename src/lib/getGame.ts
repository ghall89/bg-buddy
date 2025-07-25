import { gameById } from 'bgg-client';

export async function getGame(id: string) {
	try {
		const game = await gameById(id, { stats: true });

		return JSON.stringify(game);
	} catch (error) {
		throw error;
	}
}
