import PlayLogPlayerRepository, {
  NewPlayLogPlayer,
} from '../repositories/play-log-player-repository';
import PlayLogRepository, {
  NewPlayLog,
  PlayLog,
} from '../repositories/play-log-repository';
import UserGameRepository, {
  NewUserGame,
  UserGame,
} from '../repositories/user-game-repository';

export default class CollectionService {
  userGame: UserGameRepository;
  playLog: PlayLogRepository;
  playLogPlayer: PlayLogPlayerRepository;

  constructor() {
    this.userGame = new UserGameRepository();
    this.playLog = new PlayLogRepository();
    this.playLogPlayer = new PlayLogPlayerRepository();
  }

  /* User Games */

  async addGameToCollection(gameId: string, userId: string): Promise<UserGame> {
    return this.userGame.createOne({
      game_id: gameId,
      user_id: userId,
    });
  }

  async getUserGameById(id: string) {
    return this.userGame.findById(id);
  }

  async getUserGameByIdWithUser(id: string) {
    return this.userGame.findById(id);
  }

  async getUserGamesByUserId(userId: string): Promise<UserGame[]> {
    return this.userGame.findByUserId(userId);
  }

  async deleteUserGame(id: string) {
    return this.userGame.deleteById(id);
  }

  async updateUserGame(id: string, data: NewUserGame) {
    return this.userGame.updateOne(id, data);
  }

  /* Play Logs */

  async createPlayLog(userGameId: string): Promise<PlayLog> {
    const userGame = await this.userGame.findById(userGameId);

    if (!userGame) {
      throw new Error(`User game does not exist for id: ${userGameId}`);
    }

    const playLog = await this.playLog.createOne({
      played_date: new Date().toDateString(),
      user_game_id: userGame.id,
      creator_id: userGame.user_id,
    });

    const playLogPlayer = await this.addPlayerToPlayLog(
      playLog.id,
      userGame.user.name,
      userGame.user_id,
    );

    return { ...playLog, play_log_player: playLogPlayer };
  }

  async getPlayLogById(id: string) {
    return this.playLog.findById(id);
  }

  async deletePlayLog(id: string) {
    return this.playLog.deleteById(id);
  }

  async updatePlayLog(id: string, data: NewPlayLog) {
    return this.playLog.updateOne(id, data);
  }

  /* Play Log Players */

  async addPlayerToPlayLog(
    playLogId: string,
    playerName: string,
    userId?: string,
  ) {
    const newPlayer: NewPlayLogPlayer = {
      play_log_id: playLogId,
      name: playerName,
    };

    if (userId) {
      newPlayer.user_id = userId;
    }

    return this.playLogPlayer.createOne(newPlayer);
  }

  async getPlayLogPlayerById(id: string) {
    return this.playLogPlayer.findById(id);
  }

  async deletePlayLogPlayer(id: string) {
    return this.playLogPlayer.deleteById(id);
  }

  async updatePlayLogPlayer(id: string, data: NewPlayLogPlayer) {
    return this.playLogPlayer.updateOne(id, data);
  }
}
