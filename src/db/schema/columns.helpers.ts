import { text, timestamp } from 'drizzle-orm/pg-core';

export const creationInfo = {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};
