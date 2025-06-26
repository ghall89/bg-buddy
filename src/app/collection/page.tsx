'use client';

import { CollectionGame } from '@/db/dexie';
import { dexieStore } from '@/lib/stores/dexie-store';

export default function Page() {
  const store = dexieStore();

  store.fetchAll('games');

  return <h1>Hello Collection</h1>;
}
