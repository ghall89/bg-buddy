import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { dbClient } from './db';
import AuthService from './lib/services/auth-service';

export interface Credentials {
  email: string;
  password: string;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(dbClient),
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
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
