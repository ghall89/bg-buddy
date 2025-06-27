'use client';

import { Button, Tab, Tabs } from '@heroui/react';
import { Archive, NotebookPen, Plus, Search } from 'lucide-react';

export default function BottomTabs() {
  const options = [
    {
      label: 'Collection',
      key: 'collection',
      icon: <Archive />,
    },
    {
      label: 'Play Logs',
      key: 'play-logs',
      icon: <NotebookPen />,
    },
    {
      label: 'Games',
      key: 'games',
      icon: <Search />,
    },
  ];

  return (
    <div className="bottom-0 w-full p-2 flex justify-center gap-2 fixed bg-white/90 backdrop-blur-lg z-50">
      <Tabs>
        {options.map((option) => (
          <Tab key={option.key} aria-label={option.label} title={option.icon} />
        ))}
      </Tabs>
      <Button isIconOnly aria-label="New item" color="primary">
        <Plus />
      </Button>
    </div>
  );
}
