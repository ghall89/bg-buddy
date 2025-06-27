import { integer, pgTable, smallint, varchar } from 'drizzle-orm/pg-core';

import { creationInfo } from '../columns.helpers';

export const games = pgTable('game', {
  ...creationInfo,
  bgg_id: varchar().unique().notNull(),
  title: varchar().notNull(),
  image: varchar(),
  min_players: smallint(),
  max_players: smallint(),
  best_player_count: smallint(),
  est_playtime: integer(),
  description: varchar(),
});
