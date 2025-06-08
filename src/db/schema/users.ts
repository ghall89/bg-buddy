import { relations } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { creationInfo } from '../columns.helpers';
import { playLogs } from './playLogs';
import { userGames } from './userGames';

export const users = pgTable('user', {
  ...creationInfo,
  name: varchar(),
  email: varchar().unique().notNull(),
  email_verified: timestamp({ mode: 'date' }),
  password: varchar().notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  gamnes: many(userGames),
  playLogs: many(playLogs),
}));
