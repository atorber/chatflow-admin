import {
  Controller,
  Get,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { GroupnoticesService } from './groupnotices.service.js';
import { Store } from '../../db/store.js';

@Controller('api/v1/groupnotice')
export class GroupnoticesController {
  @Get('list')
  async findAll(@Request() req: any): Promise<string> {
    const user = req.user;
    // console.debug(user);
    // console.debug(Store.users);
    const db = Store.findUser(user.userId);
    if (!db) {
      throw new UnauthorizedException();
    }
    // console.debug(db);
    GroupnoticesService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.groupNoticeSheet, // 设置 base ID
    });
    const data = await GroupnoticesService.findAll();
    const items = data.map((value: any) => {
      const fields = value.fields;
      fields.recordId = value.recordId;
      return fields;
    });
    // console.debug(data);
    const res: any = {
      code: 200,
      message: 'success',
      data: {
        page: 1,
        pageSize: 1000,
        pageCount: 1,
        itemCount: data.length,
        list: items,
      },
    };
    return res;
  }
}
