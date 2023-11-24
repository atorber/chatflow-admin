import {
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { Store } from '../../db/store.js';
import { UsersService } from './users.service.js';

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

  @Post('change/detail')
  async changeProfile(
    @Request()
    req: {
      avatar: string;
      birthday: string;
      gender: number;
      motto: string;
      nickname: string;
    },
  ) {
    console.debug(req);
    return { code: 200, message: '个人信息修改成功！' };
  }

  @Get('setting')
  async getSetting(@Request() req: any) {
    const user = req.user;
    console.debug(user);
    // console.debug(Store.users);
    const db = Store.findUser(user.userId);
    if (!db) {
      throw new UnauthorizedException();
    }
    // console.debug(db);
    UsersService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.envSheet, // 设置 base ID
    });
    const res = await UsersService.findByField('key', 'BASE_BOT_ID');

    console.debug('ServeLoginVika:', res);

    const userInfo: any = {
      code: 200,
      message: 'success',
      data: {
        setting: {
          keyboard_event_notify: '',
          notify_cue_tone: '',
          theme_bag_img: '',
          theme_color: '',
          theme_mode: '',
        },
        user_info: {
          avatar: '',
          email: '',
          gender: 0,
          is_qiye: false,
          mobile: '15901228151',
          motto: '',
          nickname: db.nickname,
          uid: db.id,
        },
      },
    };

    console.debug('userInfo:', userInfo);
    return userInfo;
  }
}
