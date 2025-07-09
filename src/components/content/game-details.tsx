import { Button, Divider, Image } from '@heroui/react';
import { useDisclosure } from '@heroui/react';
import { NotebookPen, Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import { useFetchGame } from '@/lib/hooks/use-fetch-game';

import Drawer from '../ui/drawer';

export default function GameDetails() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const bggId = searchParams.get('id');

  const { game, setBggId } = useFetchGame();

  useEffect(() => {
    if (bggId) {
      setBggId(bggId);
      onOpen();
    }
  }, [bggId, onOpen, setBggId]);

  const handleClose = useCallback(() => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete('id');
    setBggId(undefined);

    push(`?${nextSearchParams.toString()}`);
  }, [searchParams, setBggId, push]);

  return (
    <Drawer
      title={game?.title ?? 'Loading...'}
      placement="bottom"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleClose}
    >
      {game && (
        <>
          <Image
            alt=""
            className="object-cover rounded-xl"
            src={game?.image ?? undefined}
            width={270}
          />
          <p className="text-tiny uppercase font-bold">
            {game.min_players} to {game.max_players} players
          </p>
          <p className="text-tiny uppercase font-bold">
            {game.est_playtime} minutes
          </p>
          <Divider />
          <p>{game.description}</p>
          <Divider />
          <div className="flex flex-row gap-4">
            <Button className="flex-grow" color="primary">
              <Plus />
              Add to Collection
            </Button>
            <Button className="flex-grow" color="secondary">
              <NotebookPen />
              Create Play Log
            </Button>
          </div>
        </>
      )}
    </Drawer>
  );
}
