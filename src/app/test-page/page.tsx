'use client';

import { useRepoQuery } from '@/lib/hooks/use-repo';
import GameRepository from '@/lib/repositories/game-repository';
import { Game } from '@/lib/repositories/game-repository';

export default function TestPage() {
  const { data: games, isLoading } = useRepoQuery<'game', 'findAll'>(
    'game',
    'findAll',
    [],
  );

  return (
    <div>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <ul>{games?.map((game: Game) => <li>{game.title}</li>)}</ul>
      )}
    </div>
  );
}
