import { NewGame } from '@/lib/repositories/GameRepository';
import CollectionService from '@/lib/services/CollectionService';
import GameService from '@/lib/services/GameService';

async function main() {
  const gameService = new GameService();
  const collectionService = new CollectionService();

  // const game: NewGame = {
  //   bgg_id: '379629',
  //   title: 'Knarr',
  //   est_playtime: 30,
  //   min_players: 2,
  //   max_players: 4,
  //   best_player_count: 3,
  //   description:
  //     'Assemble your Viking crew to explore new destinations in the world and trade! ',
  // };

  // const createdGame = await gameService.addGame(game);

  // console.log(createdGame);

  // const userGame = await collectionService.addGameToCollection(
  //   createdGame.id,
  //   'cmbnxqgkj0000x18o4jxw6hwz',
  // );
  //

  const userGame = await collectionService.getGamesByUserId(
    'cmbnxqgkj0000x18o4jxw6hwz',
  );

  console.log(userGame);
}

main();
