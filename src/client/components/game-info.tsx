import { CheckIcon, PlusIcon } from '@heroicons/react/16/solid';
import {
	Button,
	Card,
	CardBody,
	Chip,
	CircularProgress,
	Image,
	ScrollShadow,
} from '@heroui/react';
import type { GameDetails } from 'bgg-client';

interface GameInfoProps {
	data: GameDetails | undefined;
}

export function GameInfo({ data }: GameInfoProps) {
	const stats = [
		`${data?.avgPlaytime} minutes`,
		`${data?.minPlayers} to ${data?.maxPlayers} players`,
		`Complexity ${data?.stats?.complexity.toFixed(1)}`,
	];

	return (
		<Card className="max-w-4xl mx-auto min-h-[475px]">
			{data ? (
				<CardBody className="flex flex-row gap-5 items-start">
					<Image
						alt="Card background"
						className="object-cover rounded-xl"
						src={data.img}
						height="100%"
					/>
					<div className="flex flex-col justify-between h-full">
						<div>
							<h1 className="text-2xl mb-2 font-semibold">{data.title}</h1>
							<div className="flex flex-row gap-2">
								{stats.map((stat) => (
									<Chip key={stat}>{stat}</Chip>
								))}
							</div>

							<ScrollShadow className="h-[300px] p-2 my-3">
								{data.description.split('\n').map((paragraph) => (
									<p className="my-3" key={paragraph.slice(0, 16)}>
										{paragraph}
									</p>
								))}
							</ScrollShadow>
						</div>
						<div className="gap-2 flex flex-row">
							<Button
								startContent={<PlusIcon className="size-6" />}
								color="primary"
							>
								Add to collection
							</Button>
							<Button
								startContent={<CheckIcon className="size-6" />}
								color="secondary"
							>
								Mark as played
							</Button>
						</div>
					</div>
				</CardBody>
			) : (
				<CardBody className="flex justify-center items-center w-full">
					<CircularProgress />
				</CardBody>
			)}
		</Card>
	);
}
