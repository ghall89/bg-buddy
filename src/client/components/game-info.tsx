import { useEffect, useState } from 'react';
import { type GameDetails } from 'bgg-client';

export function GameInfo() {
  const [data, setData] = useState<GameDetails | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/games/167791');
      const json = await res.json();

      console.log(json);

      setData(json);
    }

    fetchData();
  }, []);

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
        <h2>Loading...</h2>
      )}
    </article>
  );
}
