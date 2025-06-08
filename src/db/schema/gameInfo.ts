import { relations } from 'drizzle-orm';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { creationInfo } from '../columns.helpers';
import { games } from './games';

export const gameInfo = pgTable('game_info', {
  ...creationInfo,
  min_players: integer(),
  max_players: integer(),
  best_player_count: integer(),
  est_playtime: integer(),
  description: varchar(),
  game_id: varchar().notNull().unique(),
});

export const gameInfoRelations = relations(gameInfo, ({ one }) => ({
  game_info: one(games, {
    fields: [gameInfo.game_id],
    references: [games.id],
  }),
}));
