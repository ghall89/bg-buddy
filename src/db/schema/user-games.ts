import { relations } from 'drizzle-orm';
import { boolean, pgTable, smallint, varchar } from 'drizzle-orm/pg-core';

import { creationInfo } from '../columns.helpers';
import { games } from './games';
import { playLogs } from './play-logs';
import { users } from './users';

export const userGames = pgTable('user_game', {
  ...creationInfo,
  played: boolean().notNull().default(false),
  want_to_play: boolean().notNull().default(false),
  owned: boolean().notNull().default(false),
  wishlist: boolean().notNull().default(false),
  previously_owned: boolean().notNull().default(false),
  rating: smallint(),
  game_id: varchar()
    .notNull()
    .references(() => games.id),
  user_id: varchar()
    .notNull()
    .references(() => users.id),
});

export const userGameRelations = relations(userGames, ({ one, many }) => ({
  game: one(games, {
    fields: [userGames.game_id],
    references: [games.id],
  }),
  user: one(users, {
    fields: [userGames.user_id],
    references: [users.id],
  }),
  play_logs: many(playLogs),
}));
