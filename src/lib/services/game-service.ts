import { tryCatch } from 'try-catcher-ts';

import GameRepository, { Game, NewGame } from '../repositories/game-repository';

export default class GameService {
  game: GameRepository;

  constructor() {
    this.game = new GameRepository();
  }

  /**
   * Add and return a game to the game table.
   */
  async addGame(newGame: NewGame): Promise<Game> {
    const result = await tryCatch(
      () => this.game.createOne(newGame),
      'Error adding game to database',
    );

    return result;
  }

  async updateGame(id: string, update: Partial<Game>) {
    const result = await tryCatch(
      () => this.game.updateOne(id, update),
      'Error updating game',
    );

    return result;
  }

  /**
   * Get and return all games from game table.
   */
  async allGames(): Promise<Game[]> {
    const result = await tryCatch(
      () => this.game.findAll(),
      'Error getting all games',
    );

    return result;
  }

  /**
   * Get and return a game by id from game table.
   */
  async gameById(id: string): Promise<Game | undefined> {
    const result = await tryCatch(
      () => this.game.findById(id),
      'Error getting game by ID',
    );

    return result;
  }

  /**
   * Get and return a game by its Board Game Geek ID from game table.
   */
  async gameByBGGId(bggId: string): Promise<Game | undefined> {
    const result = await tryCatch(
      () => this.game.findByBGGId(bggId),
      'Error finding game by Board Game Geek ID',
    );

    return result;
  }

  /**
   * Get and return games by player count from game table.
   */
  async gamesByPlayerCount(players: number): Promise<Game[]> {
    const result = await tryCatch(
      () => this.game.findByPlayerCount(players),
      'Error finding games by player count',
    );

    return result;
  }
}
