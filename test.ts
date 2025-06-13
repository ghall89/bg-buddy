import BoardGameGeekService from '@/lib/services/bgg-service';

async function main() {
  const bgg = new BoardGameGeekService();

  const games = await bgg.getGameById('379629');

  console.log(games);
}

main();
