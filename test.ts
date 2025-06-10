import { NewGame } from '@/lib/repositories/GameRepository';
import CollectionService from '@/lib/services/CollectionService';
import GameService from '@/lib/services/game-service';

async function main() {
  const gameService = new GameService();
  const collectionService = new CollectionService();

  const userGame = await collectionService.createPlayLog(
    'cmbo1lhm500016x8o4x1p1anp',
  );

  console.log(userGame);
}

main();
