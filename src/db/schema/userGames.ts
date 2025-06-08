import { relations } from 'drizzle-orm';
import { boolean, pgTable, varchar } from 'drizzle-orm/pg-core';

import { creationInfo } from '../columns.helpers';
import { games } from './games';
import { playLogs } from './playLogs';

export const userGames = pgTable('user_games', {
  ...creationInfo,
  played: boolean().notNull().default(false),
  want_to_play: boolean().notNull().default(false),
  owned: boolean().notNull().default(false),
  wishlist: boolean().notNull().default(false),
  previously_owned: boolean().notNull().default(false),
  game_id: varchar()
    .notNull()
    .unique()
    .references(() => games.id),
});

export const userGameRelations = relations(userGames, ({ one, many }) => ({
  game_info: one(games, {
    fields: [userGames.game_id],
    references: [games.id],
  }),
  play_logs: many(playLogs),
}));
