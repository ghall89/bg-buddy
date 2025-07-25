import { getRouteApi } from '@tanstack/react-router';
import { GameInfo } from '../components/game-info';

const route = getRouteApi('/game/$bggId');

export function GameInfoPage() {
	const { bggId } = route.useParams();

	return (
		<div>
			<GameInfo bggId={bggId} />
		</div>
	);
}
