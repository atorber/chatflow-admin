import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Store } from '../../db/store';
import { VikaDB } from '../../db/vika-db';

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

    // 如果用户不存在，则验证并创建用户
    if (!user) {
      const userNew = new VikaDB();
      const userID = await userNew.init({
        token: pass,
        spaceId: username,
      });
      if (userID) {
        Store.addUser(userNew);
        user = userNew;
      } else {
        throw new UnauthorizedException();
      }
    }

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      username: user.username,
      sub: user.userId,
    };
    console.debug(Store.users);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
