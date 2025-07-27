import { getRouteApi } from '@tanstack/react-router';

import { GameInfo } from '../components/game-info';
import { Layout } from '../components/layout/layout';

const route = getRouteApi('/game/$bggId');

export function GameInfoPage() {
	const { bggId } = route.useParams();

	return (
		<Layout>
			<GameInfo bggId={bggId} />
		</Layout>
	);
}
