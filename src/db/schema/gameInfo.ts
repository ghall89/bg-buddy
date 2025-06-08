import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { creationInfo } from '../columns.helpers';

export const gameInfo = pgTable('game_info', {
  ...creationInfo,
  min_players: integer(),
  max_players: integer(),
  best_player_count: integer(),
  est_playtime: integer(),
  description: varchar(),
});
