import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { creationInfo } from '../columns.helpers';
import { users } from './users';

export const playLogPlayers = pgTable('play_log_player', {
  ...creationInfo,
  name: varchar().notNull(),
  score: integer(),
  is_winner: boolean(),
});

export const playLogPlayerRelations = relations(playLogPlayers, ({ one }) => ({
  associatedUser: one(users),
}));
