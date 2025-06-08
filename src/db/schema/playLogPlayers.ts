import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { creationInfo } from '../columns.helpers';
import { playLogs } from './playLogs';
import { users } from './users';

export const playLogPlayers = pgTable('play_log_player', {
  ...creationInfo,
  name: varchar().notNull(),
  score: integer(),
  is_winner: boolean(),
  user_id: varchar().references(() => users.id),
  play_log_id: varchar()
    .notNull()
    .references(() => playLogs.id),
});

export const playLogPlayerRelations = relations(playLogPlayers, ({ one }) => ({
  associate_user: one(users, {
    fields: [playLogPlayers.user_id],
    references: [users.id],
  }),
  play_log: one(playLogs, {
    fields: [playLogPlayers.user_id],
    references: [playLogs.id],
  }),
}));
