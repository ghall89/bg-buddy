import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { creationInfo } from '../columns.helpers';
import { gameInfo } from './gameInfo';

export const games = pgTable('game', {
  ...creationInfo,
  bgg_id: varchar().unique().notNull(),
  title: varchar().notNull(),
  game_info_id: varchar().notNull().unique(),
});

export const gameRelations = relations(games, ({ one }) => ({
  game_info: one(gameInfo, {
    fields: [games.game_info_id],
    references: [gameInfo.id],
  }),
}));
