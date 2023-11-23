import {
  Controller,
  Get,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ContactsService } from './contacts.service.js';
import { Store } from '../../db/store.js';

@Controller('api/v1/contact')
export class ContactsController {
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
    ContactsService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.contactSheet, // 设置 base ID
    });
    const res = await ContactsService.findAll();
    console.debug(res);
    const contacts: any = {
      code: 200,
      message: 'success',
      data: {
        items: [
          {
            avatar:
              'http://localhost:5173/files/public/media/image/avatar/20231022/4f67de6461b9e930be9ac97b3a6cee4c_200x200.png',
            gender: 0,
            group_id: 0,
            id: 7,
            is_online: 0,
            motto: '',
            nickname: 'test5',
            remark: 'test5',
          },
        ],
      },
    };

    const items = res
      .map((value: any) => {
        if (value.fields.name) {
          return {
            avatar:
              value.fields.avatar ||
              'http://localhost:5173/files/public/media/image/avatar/20231022/4f67de6461b9e930be9ac97b3a6cee4c_200x200.png',
            gender: value.fields.gender,
            group_id: 0,
            id: value.fields.id,
            is_online: 0,
            motto: '',
            nickname: value.fields.name,
            remark: value.fields.alias,
            recordId: value.recordId,
          };
        }
        return false;
      })
      .filter((item) => item !== false);

    contacts.data.items = items;
    return contacts;
  }
}
