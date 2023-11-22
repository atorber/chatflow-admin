import { Injectable } from '@nestjs/common';
import { Store } from '../../db/store';
export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = Store.users;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(
      (user) => user.username === username || user.spaceName === username,
    );
  }
}
