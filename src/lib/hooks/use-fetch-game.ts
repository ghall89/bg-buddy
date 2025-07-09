import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { PgGameDetails } from '../types';

export function useFetchGame() {
  const [bggId, setBggId] = useState<string | undefined>();

  const { data, ...rest } = useQuery<PgGameDetails | null>({
    queryFn: async () => {
      if (bggId) {
        const res = await fetch(`/api/game/${bggId}`);

        if (!res.ok) throw new Error(`Failed to fetch game with id ${bggId}`);

        return res.json();
      }

      return null;
    },
    queryKey: ['game-by-bgg-id', bggId],
  });

  return { game: data, ...rest, setBggId };
}
