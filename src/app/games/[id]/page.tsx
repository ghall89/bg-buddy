'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { getGameById } from './get-game-by-id';

export default function Page() {
  const params = useParams<{ id: string }>();

  const { data: game } = useQuery({
    queryFn: () => getGameById(params.id),
    queryKey: ['game-by-id', params.id],
  });

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{game.title}</h1>
    </div>
  );
}
