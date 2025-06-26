import { Table } from 'dexie';

import { db } from '@/db/dexie';

export type DbTable = keyof typeof db;

type EntityFromTable<K extends DbTable> =
  (typeof db)[K] extends Table<infer T, any> ? T : never;

export default class DexieClient<K extends DbTable> {
  table: Table<EntityFromTable<K>, number>;

  constructor(table: K) {
    this.table = db[table] as unknown as Table<EntityFromTable<K>, number>;
  }

  private runAction<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return fn();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  add(item: EntityFromTable<K>) {
    return this.runAction(() => this.table.add(item));
  }

  update(id: number, update: Partial<EntityFromTable<K>>) {
    return this.runAction(() => this.table.update(id, update));
  }

  getAll() {
    return this.runAction(() => this.table.toArray());
  }

  find(field: string, value: any) {
    return this.runAction(() =>
      this.table.where(field).equals(value).toArray(),
    );
  }
}
