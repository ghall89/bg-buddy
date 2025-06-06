import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { db } from './db/schema';
import UserService from './lib/services/UserService';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize({ email, password }) {
        const userService = new UserService();

        const authenticatedUser = await userService.authenticate(
          email as string,
          password as string,
        );

        console.log(authenticatedUser);

        return authenticatedUser;
      },
    }),
  ],
});
