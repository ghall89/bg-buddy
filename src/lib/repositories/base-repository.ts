import { eq } from 'drizzle-orm';
import { type AnyPgColumn, type PgTable } from 'drizzle-orm/pg-core';

import { dbClient } from '@/db/drizzle';

interface IBaseRepository<T> {
  createOne(item: Partial<T>): Promise<T>;
  updateOne(id: string, update: Partial<T>): Promise<T>;
  deleteById(id: string): Promise<number>;
  findById(id: string): Promise<T | undefined>;
  find(c: AnyPgColumn, v: any): Promise<T[]>;
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

  /**
   * Create and return one document on the given table.
   */
  async createOne(item: Partial<T>): Promise<T> {
    const result = await this.db.insert(this.table).values(item).returning();
    return result[0] as T;
  }

  /**
   * Update and return one document on the given table.
   */
  async updateOne(id: string, update: Partial<T>): Promise<T> {
    const result = await this.db
      .update(this.table)
      .set(update)
      .where(eq(this.idColumn, id))
      .returning();

    return result[0] as T;
  }

  /**
   * Delete a document by ID on the given table and return the number of deleted items.
   */
  async deleteById(id: string): Promise<number> {
    const result = await this.db
      .delete(this.table)
      .where(eq(this.idColumn, id))
      .returning();

    return result?.length ?? 0;
  }

  /**
   * Find a document by ID on the given table.
   */
  async findById(id: string): Promise<T | undefined> {
    const result = await this.db
      .select()
      .from(this.table)
      .where(eq(this.idColumn, id));

    return result[0] as T | undefined;
  }

  /**
   * Find all documents by column value.
   */
  async find(column: AnyPgColumn, value: any): Promise<T[]> {
    const result = await this.db
      .select()
      .from(this.table)
      .where(eq(column, value));

    return result as T[];
  }

  /**
   * Get all documents on the given table.
   */
  async findAll(): Promise<T[]> {
    const result = await this.db.select().from(this.table);
    return result as T[];
  }
}
