import { Table } from 'dexie';
import { tryCatchSync } from 'try-catcher-ts';

import { db } from '@/db/dexie';

export type DatabaseTable = keyof typeof db;

type EntityFromTable<K extends DatabaseTable> =
  (typeof db)[K] extends Table<infer T, any> ? T : never;

export default class DexieClient<K extends DatabaseTable> {
  table: Table<EntityFromTable<K>, number>;

  constructor(table: K) {
    this.table = db[table] as unknown as Table<EntityFromTable<K>, number>;
  }

  /**
   * Add and return an item to the local IndexedDB
   */
  add(item: EntityFromTable<K>) {
    const result = tryCatchSync(
      () => this.table.add(item),
      'Error adding to IndexedDB',
    );

    return result;
  }

  /**
   * Update and return an item in the local IndexedDB
   */
  update(id: number, update: Partial<EntityFromTable<K>>) {
    const result = tryCatchSync(
      () => this.table.update(id, update),
      'Error updating item in IndexedDB',
    );

    return result;
  }

  /**
   * Get and return all of a given item type in the local IndexedDB
   */
  getAll() {
    const result = tryCatchSync(
      () => this.table.toArray(),
      'Error getting all items of a given type',
    );

    return result;
  }

  /**
   * Update and return an item in the local IndexedDB
   */
  find(field: string, value: any) {
    const result = tryCatchSync(
      () => this.table.where(field).equals(value).toArray(),
      'Error finding item in IndexedDB',
    );

    return result;
  }
}
