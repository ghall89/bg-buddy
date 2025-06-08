import { relations } from 'drizzle-orm';
import { boolean, pgTable } from 'drizzle-orm/pg-core';

import { creationInfo } from '../columns.helpers';
import { games } from './games';

export const userGames = pgTable('user_games', {
  ...creationInfo,
  played: boolean().notNull().default(false),
  want_to_play: boolean().notNull().default(false),
  owned: boolean().notNull().default(false),
  wishlist: boolean().notNull().default(false),
  previously_owned: boolean().notNull().default(false),
});

export const userGameRelations = relations(userGames, ({ one }) => ({
  game: one(games),
}));
