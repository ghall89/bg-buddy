'use server';

import { NewUser } from '@/lib/clients/UserClient';
import UserService from '@/lib/services/UserService';

export async function register(email: string, password: string) {
  const userService = new UserService();

  const newUser: NewUser = {
    email,
    password,
  };

  await userService.register(newUser);
}
