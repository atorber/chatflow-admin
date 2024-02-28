import {
  Controller,
  Get,
  Request,
  Query,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { WhitelistsService } from './whitelists.service.js';
import { Store } from '../../db/store.js';

@Controller('api/v1/whitelist')
export class WhitelistsController {
  @Get('list/white')
  async findAllWhite(
    @Request() req: any,
    @Query() query: any,
  ): Promise<string> {
    console.debug('list/white query:', query);
    const user = req.user;
    // console.debug(user);
    // console.debug(Store.users);
    const db = Store.findUser(user.userId);
    if (!db) {
      throw new UnauthorizedException();
    }
    // console.debug(db);
    WhitelistsService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.whiteListSheet, // 设置 base ID
    });
    let data: any = [];
    if (query.fieldName && query.value) {
      data = await WhitelistsService.findByField(query.fieldName, query.value);
    } else {
      data = await WhitelistsService.findAll();
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
      res.code = 200;
      res.message = 'success';
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
  @Post('list/white/create')
  async create(@Body() body: any, @Request() req: any): Promise<string> {
    console.debug('white create', body);
    const user = req.user;
    // console.debug(user);
    // console.debug(Store.users);
    const db = Store.findUser(user.userId);
    if (!db) {
      throw new UnauthorizedException();
    }
    // console.debug(db);
    WhitelistsService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.whiteListSheet, // 设置 base ID
    });
    const res: any = { code: 400, message: 'fail', data: {} };
    try {
      const resCreate: any = await WhitelistsService.create(body);
      res.data = resCreate;
      console.debug('resCreate', resCreate);
      if (resCreate.recordId) {
        res.code = 200;
        res.message = 'success';
      }
    } catch (e) {
      console.error('white create error', e);
      res.data = e;
    }
    return res;
  }
  @Post('list/white/delete')
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
    WhitelistsService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.whiteListSheet, // 设置 base ID
    });

    const resDel = await WhitelistsService.delete(body.recordId);
    console.debug('qa resDel', resDel);

    let res: any = {
      code: 400,
      message: 'error',
      data: resDel,
    };
    if (resDel.success) {
      res = {
        code: 200,
        message: 'success',
        data: {
          recordId: body.recordId,
        },
      };
    }
    return res;
  }
  @Get('list/black')
  async findAllBlack(@Request() req: any): Promise<string> {
    const user = req.user;
    // console.debug(user);
    // console.debug(Store.users);
    const db = Store.findUser(user.userId);
    if (!db) {
      throw new UnauthorizedException();
    }
    // console.debug(db);
    WhitelistsService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.whiteListSheet, // 设置 base ID
    });
    const data = await WhitelistsService.findAll();
    // console.debug(data);
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
      res.code = 200;
      res.message = 'success';
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
}
