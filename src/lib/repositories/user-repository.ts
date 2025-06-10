import { eq } from 'drizzle-orm';

import { users } from '@/db/schema';

import BaseRepository from './base-repository';

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export default class UserRepository extends BaseRepository<User> {
  constructor() {
    super(users, users.id);
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this.db
      .select()
      .from(this.table)
      .where(eq(users.email, email));

    return result[0] as User;
  }
}
