import { Heading, Section, Spinner, Text } from '@radix-ui/themes';
import type { GameDetails } from 'bgg-client';
import { useEffect } from 'react';
import { create } from 'zustand';

interface GameInfoStore {
	data: GameDetails | null;
	fetchData: (id: string) => void;
}
const gameInfoStore = create<GameInfoStore>((set) => ({
	data: null,
	fetchData: async (id: string) => {
		const url = `/api/games/${id}`;

		const res = await fetch(url);
		const json = await res.json();

		set({ data: json as GameDetails });
	},
}));

interface GameInfoProps {
	bggId: string;
}

export function GameInfo({ bggId }: GameInfoProps) {
	const { data, fetchData } = gameInfoStore();

	useEffect(() => {
		fetchData(bggId);
	}, [bggId, fetchData]);

	return (
		<Section>
			{data ? (
				<>
					<Heading as="h2">{data.title}</Heading>
					{data.description.split('\n').map((paragraph, index) => (
						<Text as="p" key={index}>
							{paragraph}
						</Text>
					))}
				</>
			) : (
				<Spinner />
			)}
		</Section>
	);
}
