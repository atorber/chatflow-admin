import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { VikaDB } from '../../db/vika-db';
import { AuthService } from '../auth/auth.service';
import { Store } from '../../db/store';
import { Public } from './decorators/public.decorator';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  async login(
    @Body() signInDto: { password: string; mobile: string; platform?: string },
  ) {
    const access_token_res = this.authService.signIn(
      signInDto.mobile,
      signInDto.password,
    );
    return {
      code: 200,
      message: 'success',
      data: {
        access_token: (await access_token_res).access_token,
        expires_in: 36000000,
        type: 'Bearer',
      },
    };
  }

  @Public()
  @Get('login')
  async loginGet(
    @Query() query: { password: string; mobile: string; platform?: string },
  ) {
    console.info(query);
    if (!query.password || !query.mobile) {
      return {
        code: 400,
        message: 'error',
        data: '用户名或者密码不能为空',
      };
    }
    const user = new VikaDB();
    const space = await user.init({
      token: query.password,
      spaceId: query.mobile,
    });

    console.info(space);
    const userID = space.code === 200 ? space.data : false;
    if (userID) {
      Store.addUser(user);
      console.info('登录成功', Store.users);
      return {
        code: 200,
        message: 'success',
        data: {
          access_token: space.data,
          expires_in: 36000000,
          type: 'Bearer',
        },
      };
    } else {
      return space;
    }
  }
}
