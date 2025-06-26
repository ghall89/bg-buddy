import cuid from 'cuid';
import { timestamp, varchar } from 'drizzle-orm/pg-core';

export const creationInfo = {
  id: varchar()
    .primaryKey()
    .$defaultFn(() => cuid()),
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};
