'use server';

import { Dispatch, SetStateAction } from 'react';

import { signOut } from '@/auth';

import { User } from '../repositories/user-repository';

export async function handleLogout(
  setLoading: Dispatch<SetStateAction<boolean>>,
  setUser: Dispatch<SetStateAction<User | null>>,
) {
  try {
    setLoading(true);
    await signOut({ redirect: false });
    setUser(null);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  } finally {
    setLoading(false);
  }
}
