import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Store } from '../../db/store';
import { VikaDB } from '../../db/vika-db';
import { delay } from '../../utils/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn(username: string, pass: string) {
    let user = await this.usersService.findOne(username);
    // console.debug('ServeLoginVika:', user);

    // 如果用户不存在，则验证并创建用户
    const userNew = new VikaDB();
    const userID = await userNew.init({
      token: pass,
      spaceId: username,
    });
    delay(500);
    if (userID.data) {
      userNew.username = username;
      user = userNew;
      UsersService.setVikaOptions({
        apiKey: user.token,
        baseId: user.dataBaseIds.envSheet, // 设置 base ID
      });
      const resEnv = await UsersService.findAll();
      console.debug('ServeLoginVika:', resEnv);
      const config: any = {};
      resEnv.map((item: any) => {
        config[item.fields.key] = item.fields.value || undefined;
      });
      const BASE_BOT_ID: string = config['BASE_BOT_ID'] || '';
      // console.debug('ServeLoginVika:', BASE_BOT_ID);
      userNew.id = BASE_BOT_ID;

      const BASE_BOT_NAME: string = config['BASE_BOT_NAME'] || '';
      // console.debug('ServeLoginVika:', BASE_BOT_NAME);

      userNew.nickname = BASE_BOT_NAME || '';
      userNew.password = pass;
      userNew.config = config;
      Store.addUser(userNew);
      const payload = {
        username: user.username,
        sub: user.userId,
      };
      console.debug(Store.users);
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      return {
        access_token: '',
      };
    }
  }
}
