import { VikaDB } from './vika-db.js';

export class Store {
  static users: VikaDB[] = [];

  // 注册用户
  static addUser(user: VikaDB) {
    if (user.userId) {
      Store.users.push(user);
    }
    return {
      spaceName: user.spaceName,
      token: user.token,
    };
  }

  // 移除用户
  static removeUser(spaceId: string) {
    // 移除用户
    this.users = this.users.filter((user) => user.userId !== spaceId);
    return true;
  }

  // 查询用户
  static findUser(spaceId: string) {
    return this.users.find((user) => user.userId === spaceId);
  }
}
