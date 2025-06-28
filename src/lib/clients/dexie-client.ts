import { Table } from 'dexie';

import { db } from '@/db/dexie';

export type DatabaseTable = keyof typeof db;

type EntityFromTable<K extends DatabaseTable> =
  (typeof db)[K] extends Table<infer T, any> ? T : never;

export default class DexieClient<K extends DatabaseTable> {
  table: Table<EntityFromTable<K>, number>;

  constructor(table: K) {
    this.table = db[table] as unknown as Table<EntityFromTable<K>, number>;
  }

  private runAction<T>(action: () => Promise<T>): Promise<T> {
    try {
      return action();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Add and return an item to the local IndexedDB
   */
  add(item: EntityFromTable<K>) {
    return this.runAction(() => this.table.add(item));
  }

  /**
   * Update and return an item in the local IndexedDB
   */
  update(id: number, update: Partial<EntityFromTable<K>>) {
    return this.runAction(() => this.table.update(id, update));
  }

  /**
   * Get and return all of a given item type in the local IndexedDB
   */
  getAll() {
    return this.runAction(() => this.table.toArray());
  }

  /**
   * Update and return an item in the local IndexedDB
   */
  find(field: string, value: any) {
    return this.runAction(() =>
      this.table.where(field).equals(value).toArray(),
    );
  }
}
