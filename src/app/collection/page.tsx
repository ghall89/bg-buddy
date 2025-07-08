'use client';

import { useEffect } from 'react';

import { dexieStore } from '@/lib/stores/dexie-store';

export default function Page() {
  const store = dexieStore();

  useEffect(() => {
    store.fetchAll('games');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <h1>Hello Collection</h1>;
}
