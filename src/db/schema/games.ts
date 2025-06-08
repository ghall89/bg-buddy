import { relations } from 'drizzle-orm';
import { integer, pgTable, smallint, varchar } from 'drizzle-orm/pg-core';

import { creationInfo } from '../columns.helpers';
import { userGames } from './userGames';

export const games = pgTable('game', {
  ...creationInfo,
  bgg_id: varchar().unique().notNull(),
  title: varchar().notNull(),
  min_players: smallint(),
  max_players: smallint(),
  best_player_count: smallint(),
  est_playtime: integer(),
  description: varchar(),
});

export const gameRelations = relations(games, ({ many }) => ({
  userGames: many(userGames),
}));
