'use server';

import { signIn } from '@/auth';

export async function handleLogin(credentials: {
  email: string;
  password: string;
}) {
  return signIn({
    email: credentials.email,
    password: credentials.password,
  } as any);
}
