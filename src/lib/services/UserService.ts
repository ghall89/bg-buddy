import { compare, genSalt, hash } from 'bcrypt-ts';

import UserClient, { NewUser, User } from '../clients/UserClient';

export default class UserService {
  user: UserClient;

  constructor() {
    this.user = new UserClient();
  }

  async register(newUser: NewUser) {
    console.log(newUser);

    const salt = await genSalt(10);
    const hashedPassword = await hash(newUser.password, salt);

    const createdUser = this.user.create({
      ...newUser,
      password: hashedPassword,
    });
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    const user = await this.user.findByEmail(email);

    if (user.length === 0) {
      return null;
    }

    let passwordsMatch = await compare(password, user[0].password!);
    if (passwordsMatch) return user[0];

    return null;
  }
}
