import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from '@heroui/react';
import { NotebookPen, Plus } from 'lucide-react';

import { Game } from '@/lib/repositories/game-repository';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    game && (
      <Card className="py-4">
        <CardBody className="overflow-visible py-2">
          <Image
            alt=""
            className="object-cover rounded-xl"
            src={game?.image ?? undefined}
            width={270}
          />
        </CardBody>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h2 className="font-bold text-2xl">{game.title}</h2>
          <p className="text-tiny uppercase font-bold">
            {game.min_players} to {game.max_players} players
          </p>
          <p className="text-tiny uppercase font-bold">
            {game.est_playtime} minutes
          </p>
        </CardHeader>
        <Divider />
        <CardFooter className="flex gap-2">
          <Button className="flex-grow" color="primary">
            <Plus />
            Add to Collection
          </Button>
          <Button className="flex-grow" color="secondary">
            <NotebookPen />
            Create Play Log
          </Button>
        </CardFooter>
      </Card>
    )
  );
}
