import { relations } from 'drizzle-orm';
import { date, pgTable, varchar } from 'drizzle-orm/pg-core';

import { creationInfo } from '../columns.helpers';
import { playLogPlayers } from './play-log-players';
import { userGames } from './user-games';
import { users } from './users';

export const playLogs = pgTable('play_log', {
  ...creationInfo,
  played_date: date().notNull(),
  user_game_id: varchar()
    .notNull()
    .references(() => userGames.id),
  creator_id: varchar()
    .notNull()
    .references(() => users.id),
});

export const playLogRelations = relations(playLogs, ({ many, one }) => ({
  players: many(playLogPlayers),
  user_game: one(userGames, {
    fields: [playLogs.user_game_id],
    references: [userGames.id],
  }),
  creator: one(users, {
    fields: [playLogs.creator_id],
    references: [users.id],
  }),
}));
