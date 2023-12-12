import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { NoticesService } from './notices.service.js';
import { Store } from '../../db/store.js';

@Controller('api/v1/notice')
export class NoticesController {
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
    NoticesService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.noticeSheet, // 设置 base ID
    });
    const data = await NoticesService.findAll();
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
  @Post('create')
  async create(@Body() body: any, @Request() req: any): Promise<string> {
    const user = req.user;
    // console.debug(user);
    // console.debug(Store.users);
    const db = Store.findUser(user.userId);
    if (!db) {
      throw new UnauthorizedException();
    }
    // console.debug(db);
    NoticesService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.noticeSheet, // 设置 base ID
    });
    const resCreate: any = await NoticesService.create(body);
    console.debug('resCreate', resCreate);
    const res: any = { code: 400, message: 'fail', data: {} };
    if (resCreate.recordId) {
      res.code = 200;
      res.message = 'success';
      res.data = resCreate;
    }
    return res;
  }
  @Post('delete')
  async delete(@Body() body: any, @Request() req: any): Promise<string> {
    //   {
    //     "recordId":21705
    // }
    console.debug('qa delete', body);
    const user = req.user;
    // console.debug(user);
    // console.debug(Store.users);
    const db = Store.findUser(user.userId);
    if (!db) {
      throw new UnauthorizedException();
    }
    // console.debug(db);
    NoticesService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.noticeSheet, // 设置 base ID
    });

    const resDel = await NoticesService.delete(body.recordId);
    console.debug('qa resDel', resDel);

    let res: any = '';
    if (resDel.success) {
      res = {
        code: 200,
        message: 'success',
        data: {},
      };
    } else {
      res = {
        code: 400,
        message: 'error',
        data: {},
      };
    }
    return res;
  }
}
