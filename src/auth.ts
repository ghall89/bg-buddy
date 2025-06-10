import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { db } from './db/schema';
import AuthService from './lib/services/auth-service';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize({ email, password }) {
        const authService = new AuthService();

        const authenticatedUser = await authService.authenticate(
          email as string,
          password as string,
        );

        console.log(authenticatedUser);

        return authenticatedUser;
      },
    }),
  ],
});
