import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, text } from 'drizzle-orm/pg-core';

import { creationInfo } from './columns.helpers';

export const userGames = pgTable('user_games', {
  ...creationInfo,
  played: boolean('played').notNull().default(false),
  wantToPlay: boolean('want_to_play').notNull().default(false),
  owned: boolean('owned').notNull().default(false),
  wishlist: boolean('owned').notNull().default(false),
  previouslyOwned: boolean('previously_owned').notNull().default(false),
});

export const userGameRelations = relations(userGames, ({ one }) => ({
  game: one(games),
}));

export const games = pgTable('game', {
  ...creationInfo,
  bggId: text('bgg_id').unique().notNull(),
  title: text('title').notNull(),
});

export const gameRelations = relations(games, ({ one }) => ({
  game_info: one(gameInfo),
}));

export const gameInfo = pgTable('game_info', {
  ...creationInfo,
  minPlayers: integer('min_players'),
  maxPlayers: integer('max_players'),
  bestPlayerCount: integer('best_player_count'),
  estPlaytime: integer('est_playtime'),
  description: text('description'),
});
