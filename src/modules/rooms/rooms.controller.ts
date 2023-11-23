import {
  Controller,
  Get,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { RoomsService } from './rooms.service.js';
import { Store } from '../../db/store.js';

@Controller('api/v1/group')
export class RoomsController {
  @Get('list')
  async findAll(@Request() req: any): Promise<string> {
    const user = req.user;
    console.debug(user);
    // console.debug(Store.users);
    const db = Store.findUser(user.userId);
    if (!db) {
      throw new UnauthorizedException();
    }
    // console.debug(db);
    RoomsService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.roomSheet, // 设置 base ID
    });
    const res = await RoomsService.findAll();
    console.debug(res);
    const groups: any = {
      code: 200,
      message: 'success',
      data: {
        items: [
          {
            avatar: '',
            creator_id: 2055,
            group_name: '抖聊开发群',
            id: 1026,
            is_disturb: 0,
            leader: 2,
            profile: '',
          },
        ],
      },
    };

    const items = res
      .map((value: any) => {
        if (value.fields.topic) {
          return {
            avatar: value.fields.avatar,
            creator_id: value.fields.ownerId,
            group_name: value.fields.topic,
            id: value.fields.id,
            is_disturb: 0,
            leader: 2,
            profile: '',
            recordId: value.recordId,
          };
        }
        return false;
      })
      .filter((item) => item !== false);

    groups.data.items = items;
    return groups;
  }
}
