'use server';

import { Credentials, signIn } from '@/auth';

export async function handleLogin(credentials: Credentials) {
  return signIn({
    email: credentials.email,
    password: credentials.password,
  } as any);
}
