import { useMutation, useQuery } from '@tanstack/react-query';

import DexieClient, { DbTable } from '../clients/dexie-client';

export const useDexieQuery = (table: DbTable) =>
  useQuery({
    queryFn: async () => {
      const dexie = new DexieClient(table);

      return dexie.getAll();
    },
    queryKey: [table, 'get-all'],
  });

export const useDexieMutation = (table: DbTable) =>
  useMutation({
    mutationFn: (data: any) => {
      const dexie = new DexieClient(table);

      return dexie.add(data);
    },
    mutationKey: [table, 'add'],
  });
