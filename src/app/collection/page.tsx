'use client';

import { dexieStore } from '@/lib/stores/dexie-store';
import { CollectionGame } from '@/lib/types';

export default function Page() {
  const store = dexieStore();

  store.fetchAll('games');

  return <h1>Hello Collection</h1>;
}
