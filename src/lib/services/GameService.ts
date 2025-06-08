import GameRepository, { NewGame } from '../repositories/GameRepository';

export default class GameService {
  game: GameRepository;

  constructor() {
    this.game = new GameRepository();
  }

  async addGame(newGame: NewGame) {
    return this.game.createOne(newGame);
  }
}
