'use server';

import { NewUser } from '@/lib/repositories/user-repository';
import UserService from '@/lib/services/auth-service';

export async function handleSignup(email: string, password: string) {
  const userService = new UserService();

  const newUser: NewUser = {
    email,
    password,
  };

  await userService.register(newUser);
}
