import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { QasService } from './qas.service.js';
import { Store } from '../../db/store.js';

@Controller('api/v1/qa')
export class QasController {
  @Get('list')
  async findAll(@Request() req: any, @Query() query: any): Promise<string> {
    const user = req.user;
    // console.debug(user);
    // console.debug(Store.users);
    const db = Store.findUser(user.userId);
    if (!db) {
      throw new UnauthorizedException();
    }
    // console.debug(db);
    QasService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.qaSheet, // 设置 base ID
    });
    let data: any = [];
    if (query.keyword) {
      data = await QasService.findByQuery(query.keyword);
    } else {
      data = await QasService.findAll();
    }
    const res: any = {
      code: 400,
      message: 'error',
      data,
    };
    if (data.length) {
      const items = data.map((value: any) => {
        const fields = value.fields;
        fields.recordId = value.recordId;
        return fields;
      });
      res.data = {
        page: 1,
        pageSize: 1000,
        pageCount: 1,
        itemCount: data.length,
        list: items,
      };
    }
    return res;
  }
  @Post('create')
  async create(@Body() body: any, @Request() req: any): Promise<string> {
    console.debug('qa create', body);
    const user = req.user;
    // console.debug(user);
    // console.debug(Store.users);
    const db = Store.findUser(user.userId);
    if (!db) {
      throw new UnauthorizedException();
    }
    // console.debug(db);
    QasService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.qaSheet, // 设置 base ID
    });
    const res: any = { code: 400, message: 'fail', data: {} };
    try {
      const resCreate: any = await QasService.create(body);
      res.data = resCreate;
      console.debug('resCreate', resCreate);
      if (resCreate.recordId) {
        res.code = 200;
        res.message = 'success';
        res.data = resCreate;
      }
    } catch (e) {
      console.error(e);
      res.message = 'error';
      res.data = e;
    }
    return res;
  }
  @Post('update')
  async update(@Request() req: any): Promise<string> {
    const user = req.user;
    // console.debug(user);
    // console.debug(Store.users);
    const db = Store.findUser(user.userId);
    if (!db) {
      throw new UnauthorizedException();
    }
    // console.debug(db);
    QasService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.qaSheet, // 设置 base ID
    });
    return '';
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
    QasService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.qaSheet, // 设置 base ID
    });

    const resDel = await QasService.delete(body.recordId);
    console.debug('qa resDel', resDel);

    const res: any = {
      code: 400,
      message: 'error',
      data: resDel,
    };
    if (resDel.success) {
      res.code = 200;
      res.message = 'success';
      res.data = {
        recordId: body.recordId,
      };
    }
    return res;
  }
}
