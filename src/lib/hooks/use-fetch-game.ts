import { useQuery } from '@tanstack/react-query';

export function useFetchGame(bggId: string) {
  const { data, ...rest } = useQuery({
    queryFn: async () => {
      const res = await fetch(`/api/game/${bggId}`);

      if (!res.ok) throw new Error(`Failed to fetch game with id ${bggId}`);

      return res.json();
    },
    queryKey: ['game-by-bgg-id', bggId],
  });

  return { game: data, ...rest };
}
