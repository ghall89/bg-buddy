import GameRepository, { Game, NewGame } from '../repositories/game-repository';

export default class GameService {
  game: GameRepository;

  constructor() {
    this.game = new GameRepository();
  }

  async addGame(newGame: NewGame): Promise<Game> {
    return this.game.createOne(newGame);
  }

  async allGames(): Promise<Game[]> {
    return this.game.findAll();
  }

  async gameById(id: string): Promise<Game | undefined> {
    return this.game.findById(id);
  }

  async gameByBGGId(bggId: string): Promise<Game | undefined> {
    return this.game.findByBGGId(bggId);
  }

  async gamesByPlayerCount(players: number): Promise<Game[]> {
    return this.game.findByPlayerCount(players);
  }
}
