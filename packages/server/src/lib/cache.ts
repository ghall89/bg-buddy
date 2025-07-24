import { sql } from 'bun';

export async function handleCache(
  table: string,
  id: string,
  dataFunction: () => Promise<string>,
): Promise<Response> {
  let response;

  const cachedData = await sql`
    SELECT * FROM ${table}
    WHERE id = ${id}
  `;

  if (!cachedData) {
    const fetchedData = await dataFunction();

    const dataAsString = JSON.stringify(fetchedData);

    await sql`
    INSERT INTO ${table} (id, data)
    VALUES (${id}, ${dataAsString})
    `;

    response = dataAsString;
  } else {
    response = cachedData;
  }

  return new Response(response);
}
