import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { VikaDB } from '../../db/vika-db';
import { Store } from '../../db/store';
import { Public } from './decorators/public.decorator';

@Controller('api/v1/auth')
export class AuthController {
  @Public()
  @Post('login')
  async login(
    @Body() body: { password: string; mobile: string; platform?: string },
  ) {
    if (!body.password || !body.mobile) {
      return {
        code: 400,
        message: 'error',
        data: '用户名或者密码不能为空',
      };
    }
    const user = new VikaDB();

    const userID = await user.init({
      token: body.password,
      spaceName: body.mobile,
    });
    if (userID) {
      Store.addUser(user);

      return {
        code: 200,
        message: 'success',
        data: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJndWFyZCI6ImFwaSIsImlzcyI6ImltLndlYiIsImV4cCI6MTcyMTA3MDkwNCwiaWF0IjoxNjg1MDcwOTA0LCJqdGkiOiIyMDU0In0.-Mk4a20gur-QPxlYjgYc_eHWpWkDURJTawO0yBQ_b2g',
          expires_in: 36000000,
          type: 'Bearer',
        },
      };
    } else {
      return false;
    }
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
      spaceName: query.mobile,
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
