import { eq } from 'drizzle-orm';

import { userGames } from '@/db/schema';

import PlayLogRepository from '../repositories/PlayLogRepository';
import UserGameRepository, {
  NewUserGame,
  UserGame,
} from '../repositories/UserGameRepository';

export default class CollectionService {
  userGame: UserGameRepository;
  playLog: PlayLogRepository;

  constructor() {
    this.userGame = new UserGameRepository();
    this.playLog = new PlayLogRepository();
  }

  async addGameToCollection(gameId: string, userId: string): Promise<UserGame> {
    return this.userGame.createOne({
      game_id: gameId,
      user_id: userId,
    });
  }

  async getGamesByUserId(userId: string): Promise<UserGame[]> {
    return this.userGame.db.query.userGames.findMany({
      where: eq(userGames.user_id, userId),
      with: {
        game: true,
        play_logs: true,
      },
    });
  }
}
