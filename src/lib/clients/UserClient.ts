import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

import BaseClient from './BaseClient';

export type User = typeof users.$inferSelect; // For selected rows
export type NewUser = typeof users.$inferInsert; // For insert operations

export default class UserClient extends BaseClient<User> {
  constructor() {
    super(users, users.id);
  }

  async findByEmail(email: string):  Promise<User[]> {
    const result = await this.db
      .select()
      .from(this.table)
      .where(eq(users.email, email));

    return result as User[];
  }
  }
}
