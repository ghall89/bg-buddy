import { useQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import type { GameDetails } from 'bgg-client';

import { GameInfo } from '../components/game-info';
import { Layout } from '../components/layout/layout';
import { Tags } from '../components/tags';

const route = getRouteApi('/game/$bggId');

export function GameInfoPage() {
	const { bggId } = route.useParams();

	const { data } = useQuery<GameDetails>({
		queryFn: async () => {
			const url = `/api/games/${bggId}`;

			const res = await fetch(url);
			const json = await res.json();

			return json as GameDetails;
		},
		queryKey: ['fetch-game', bggId],
		staleTime: Infinity,
	});

	return (
		<Layout>
			<section className="my-4">
				<GameInfo data={data} />
				<Tags
					tags={
						data?.links
							.filter((link) => link.type === 'boardgamemechanic')
							.map((link) => link.value) ?? []
					}
				/>
			</section>
		</Layout>
	);
}
