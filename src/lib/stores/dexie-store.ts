import { create } from 'zustand';

import DexieClient, { DbTable } from '../clients/dexie-client';

interface DexieStore {
  items: any;
  fetchAll: (t: DbTable) => void;
}

export const dexieStore = create<DexieStore>((set) => ({
  items: [],
  fetchAll: (table: DbTable) => {
    const dexie = new DexieClient(table);

    const items = dexie.getAll();

    set({ items });
  },
}));
