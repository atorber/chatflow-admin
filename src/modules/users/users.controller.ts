import {
  Body,
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
    // console.debug(user);
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
        hash: db.hash,
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
    // console.debug(user);
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
    // const res = await UsersService.findByField('key', 'BASE_BOT_ID');
    // console.debug('ServeLoginVika:', res);

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
          hash: db.hash,
        },
      },
    };

    console.debug('userInfo:', JSON.stringify(userInfo));
    return userInfo;
  }

  @Get('config')
  async getConfig(@Request() req: any) {
    const user = req.user;
    // console.debug(user);
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
    // const res = await UsersService.findByField('key', 'BASE_BOT_ID');
    // console.debug('ServeLoginVika:', res);

    const res = await UsersService.findAll();
    const data = res.map((item: any) => {
      const field = item.fields;
      field.id = item.recordId;
      return field;
    });

    const resInfo: any = {
      code: 200,
      message: 'success',
      data,
    };

    console.debug('resInfo:', JSON.stringify(resInfo));
    return resInfo;
  }

  @Get('config/group')
  async getConfigGroup(@Request() req: any) {
    const user = req.user;
    // console.debug(user);
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
    // const res = await UsersService.findByField('key', 'BASE_BOT_ID');
    // console.debug('ServeLoginVika:', res);

    const res = await UsersService.findAll();
    const data: any = {};
    res.forEach((item: any) => {
      const field = item.fields;
      if (field.value === 'true') {
        field.value = true;
      } else if (field.value === 'false') {
        field.value = false;
      }
      field.id = item.recordId;
      const group = field.name.split('-')[0];
      field.name = field.name.split('-')[1];
      if (data[group]) {
        data[group].push(field);
      } else {
        data[group] = [field];
      }
    });

    const resInfo: any = {
      code: 200,
      message: 'success',
      data,
    };

    console.debug('userInfo:', JSON.stringify(resInfo));
    return resInfo;
  }

  // 批量更新配置信息
  @Post('config')
  async setConfig(@Request() req: any, @Body() body: any) {
    console.debug('setConfig body:', body);
    const user = req.user;
    // console.debug(user);
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
    const res = await UsersService.updatEmultiple(body);
    console.debug('update config:', res);
    const data: any = {
      code: 400,
      message: 'fail',
      data: {},
    };
    if (res.success) {
      data.code = 200;
      data.message = 'success';
      data.data = res;
    }

    return data;
  }
}
