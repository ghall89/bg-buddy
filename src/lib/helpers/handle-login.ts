'use server';

import { UpdateSession } from 'next-auth/react';
import { Dispatch, SetStateAction } from 'react';

import { signIn } from '@/auth';

export async function handleLogin(
  setLoading: Dispatch<SetStateAction<boolean>>,
  credentials: { email: string; password: string },
  update: UpdateSession,
) {
  try {
    setLoading(true);

    const result = await signIn('credentials', {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    await update();

    return result;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  } finally {
    setLoading(false);
  }
}
