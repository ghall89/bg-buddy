import { create } from 'zustand';

import DexieClient, { DatabaseTable } from '../clients/dexie-client';

interface DexieStore {
  items: any;
  fetchAll: (t: DatabaseTable) => void;
}

export const dexieStore = create<DexieStore>((set) => ({
  items: [],
  fetchAll: (table: DatabaseTable) => {
    const dexie = new DexieClient(table);

    const items = dexie.getAll();

    set({ items });
  },
}));
