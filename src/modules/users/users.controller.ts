import {
  Controller,
  Get,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { Store } from '../../db/store.js';

@Controller('/api/v1/users')
export class UsersController {
  @Get('detail')
  async getProfile(@Request() req: any) {
    const user = req.user;
    console.debug(user);
    // console.debug(Store.users);
    const db = Store.findUser(user.userId);
    if (!db) {
      throw new UnauthorizedException();
    }
    console.debug(db);
    const userInfo = {
      code: 200,
      message: 'success',
      data: {
        avatar:
          'https://im.gzydong.com/public/media/image/avatar/20230530/f76a14ce98ca684752df742974f5473a_200x200.png',
        birthday: '2023-06-11',
        email: '837215079@qq.com',
        gender: 2,
        id: '2055',
        mobile: '13800138000',
        motto: '...',
        nickname: '老牛逼了',
      },
    };

    userInfo.data.nickname = db.nickname;
    userInfo.data.id = db.id;
    return userInfo;
  }
}
