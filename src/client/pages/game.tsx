import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Flex, Link } from '@radix-ui/themes';
import { getRouteApi } from '@tanstack/react-router';

import { GameInfo } from '../components/game-info';
import { Layout } from '../layout';

const route = getRouteApi('/game/$bggId');

export function GameInfoPage() {
	const { bggId } = route.useParams();

	return (
		<Layout>
			<Link href="/">
				<Flex gap="1" align="center">
					<ArrowLeftIcon />
					Back
				</Flex>
			</Link>
			<GameInfo bggId={bggId} />
		</Layout>
	);
}
