import { eq } from 'drizzle-orm';
import { type AnyPgColumn, type PgTable } from 'drizzle-orm/pg-core';

import { dbClient } from '@/db';

interface IBaseRepository<T> {
  createOne(item: Partial<T>): Promise<T>;
  updateOne(id: string, update: Partial<T>): Promise<T>;
  deleteById(id: string): Promise<number>;
  findById(id: string): Promise<T | undefined>;
  findAll(): Promise<T[]>;
}

export default class BaseRepository<T> implements IBaseRepository<T> {
  db = dbClient;
  table: PgTable;
  idColumn: AnyPgColumn;

  constructor(table: PgTable, idColumn: AnyPgColumn) {
    this.table = table;
    this.idColumn = idColumn;
  }

  async createOne(item: Partial<T>): Promise<T> {
    const result = await this.db.insert(this.table).values(item).returning();
    return result[0] as T;
  }

  async updateOne(id: string, update: Partial<T>): Promise<T> {
    const result = await this.db
      .update(this.table)
      .set(update)
      .where(eq(this.idColumn, id))
      .returning();

    return result[0] as T;
  }

  async deleteById(id: string): Promise<number> {
    const result = await this.db
      .delete(this.table)
      .where(eq(this.idColumn, id));

    return result.rowCount ?? 0;
  }

  async findById(id: string): Promise<T | undefined> {
    const result = await this.db
      .select()
      .from(this.table)
      .where(eq(this.idColumn, id));

    return result[0] as T | undefined;
  }

  async findAll(): Promise<T[]> {
    const result = await this.db.select().from(this.table);
    return result as T[];
  }
}
