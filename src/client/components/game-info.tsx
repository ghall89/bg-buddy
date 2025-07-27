import { CircularProgress } from '@heroui/react';
import type { GameDetails } from 'bgg-client';
import { useQuery } from '@tanstack/react-query';

interface GameInfoProps {
	bggId: string;
}

export function GameInfo({ bggId }: GameInfoProps) {
	const { data } = useQuery<GameDetails>({
		queryFn: async () => {
			const url = `/api/games/${bggId}`;

			const res = await fetch(url);
			const json = await res.json();

			return json as GameDetails;
		},
		queryKey: ['fetch-game', bggId],
	});

	return (
		<section>{data ? <h2>{data.title}</h2> : <CircularProgress />}</section>
	);
}
