import { useEffect, useState } from 'react';
import { type GameDetails } from 'bgg-client';

import { Loading } from './loading';

interface GameInfoProps {
  bggId: string;
}

export function GameInfo({ bggId }: GameInfoProps) {
  const [data, setData] = useState<GameDetails | null>(null);

  useEffect(() => {
    async function fetchData() {
      const url = `/api/games/${bggId}`;

      const res = await fetch(url);
      const json = await res.json();

      console.log(json);

      setData(json);
    }

    fetchData();
  }, [bggId]);

  return (
    <article>
      {data ? (
        <>
          <h2>{data.title}</h2>
          {data.description.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </>
      ) : (
        <Loading />
      )}
    </article>
  );
}
