import { Controller, Get } from '@nestjs/common';
import { RoomsService } from './rooms.service.js';
import { VikaDB } from '../../db/vika-db.js';
import 'dotenv/config.js';

@Controller('api/v1/group')
export class RoomsController {
  @Get('list')
  async findAll(): Promise<string> {
    const db = new VikaDB();
    await db.init({
      spaceName: process.env.VIKA_SPACE_NAME || '',
      token: process.env.VIKA_TOKEN || '',
    });
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
