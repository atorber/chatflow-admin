import { VikaDB } from './vika-db.js';

export class Store {
  static users: {
    [key: string]: VikaDB;
  } = {};

  // 注册用户
  static addUser(user: VikaDB) {
    if (user.spaceId) {
      Store.users[user.spaceId] = user;
    }
    return {
      spaceName: user.spaceName,
      token: user.token,
    };
  }

  // 移除用户
  static removeUser(spaceName: string) {
    delete Store.users[spaceName];
    return true;
  }

  // 查询用户
  static findUser(spaceName: string) {
    const user = Store.users[spaceName];
    return user;
  }
}
