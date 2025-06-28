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
    return this.game.createOne(newGame);
  }

  /**
   * Get and return all games from game table.
   */
  async allGames(): Promise<Game[]> {
    return this.game.findAll();
  }

  /**
   * Get and return a game by id from game table.
   */
  async gameById(id: string): Promise<Game | undefined> {
    return this.game.findById(id);
  }

  /**
   * Get and return a game by its Board Game Geek ID from game table.
   */
  async gameByBGGId(bggId: string): Promise<Game | undefined> {
    return this.game.findByBGGId(bggId);
  }

  /**
   * Get and return games by player count from game table.
   */
  async gamesByPlayerCount(players: number): Promise<Game[]> {
    return this.game.findByPlayerCount(players);
  }
}
