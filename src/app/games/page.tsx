'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { getGames } from './get-games';

export default function Page() {
  const { data } = useQuery({
    queryFn: async () => {
      return getGames();
    },
    queryKey: ['all-games'],
  });

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul>
        {data.map((game) => (
          <li key={game.id}>
            <Link href={`/games/${game.id}`}>{game.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
