import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

const connection = postgres(process.env.DATABASE_URL!, {});

export const dbClient = drizzle(connection, {
  schema,
  logger: true,
});
