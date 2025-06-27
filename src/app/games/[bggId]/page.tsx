'use client';

import { useParams } from 'next/navigation';

import { useFetchGame } from '@/lib/hooks/use-fetch-game';

import GameCard from './components/game-card';

export default function Page() {
  const params = useParams<{ bggId: string }>();

  const { game, loading } = useFetchGame(params.bggId);

  return (
    <div>
      <GameCard game={game} />
    </div>
  );
}
