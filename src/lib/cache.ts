import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function handleCache(
  table: string,
  id: string,
  dataFunction: () => Promise<string>,
): Promise<Response> {
  let response;

  const allowedTables = ['games'];
  if (!allowedTables.includes(table)) {
    throw new Error('Invalid table name');
  }

  const cachedData = await sql.query(
    `SELECT * FROM ${table} WHERE bgg_id = $1`,
    [id],
  );

  if (cachedData.length === 0) {
    const fetchedData = await dataFunction();
    const dataAsString = JSON.stringify(fetchedData);
    await sql.query(
      `INSERT INTO ${table}(bgg_id, data, updated_dt) VALUES ($1, $2, $3)`,
      [id, dataAsString, new Date()],
    );
    response = dataAsString;
  } else {
    console.log('Getting data from cache');
    response = cachedData[0].data;
  }

  return new Response(response);
}
