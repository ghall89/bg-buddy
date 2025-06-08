import { compare, genSalt, hash } from 'bcrypt-ts';

import UserRepository, { NewUser, User } from '../repositories/UserRepository';

export default class UserService {
  user: UserRepository;

  constructor() {
    this.user = new UserRepository();
  }

  async register(newUser: NewUser): Promise<User | null> {
    console.log(newUser);

    const salt = await genSalt(10);
    const hashedPassword = await hash(newUser.password, salt);

    const createdUser = await this.user.createOne({
      ...newUser,
      password: hashedPassword,
    });

    if (!createdUser) {
      return null;
    }

    return createdUser as User;
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    const user = await this.user.findByEmail(email);

    if (!user) {
      return null;
    }

    let passwordsMatch = await compare(password, user.password!);
    if (passwordsMatch) {
      return user;
    }

    return null;
  }
}
