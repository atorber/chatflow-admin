import {
  Controller,
  Get,
  Request,
  Query,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { GroupsService } from './groups.service.js';
import { Store } from '../../db/store.js';

@Controller('api/v1/contact/group')
export class GroupsController {
  @Get('list')
  async findAllWhite(
    @Request() req: any,
    @Query() query: any,
  ): Promise<string> {
    console.debug('list query:', query);
    const user = req.user;
    // console.debug(user);
    // console.debug(Store.users);
    const db = Store.findUser(user.userId);
    if (!db) {
      throw new UnauthorizedException();
    }
    // console.debug(db);
    GroupsService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.groupSheet, // 设置 base ID
    });
    let data: any = [];
    if (query.fieldName && query.value) {
      data = await GroupsService.findByField(query.fieldName, query.value);
    } else {
      data = await GroupsService.findAll();
    }
    const res: any = {
      code: 400,
      message: 'error',
      data,
    };
    if (data.length) {
      const hash: any = {};
      data.map((value: any) => {
        const fields = value.fields;
        fields.recordId = value.recordId;
        if (fields.groupName && hash[fields.groupName]) {
          hash[fields.groupName].count = hash[fields.groupName].count + 1;
          return null;
        } else {
          const sort = Object.keys(hash).length + 1;
          const item = {
            count: 1,
            id: sort,
            name: fields.groupName,
            sort,
          };
          hash[fields.groupName] = item;
          return item;
        }
      });

      // 将hash转换为items数组
      const items = Object.keys(hash).map((key: any) => hash[key]);

      items.unshift({
        count: data.length,
        id: 0,
        name: '全部',
        sort: 0,
      });

      res.code = 200;
      res.message = 'success';
      res.data = {
        items,
      };
    }
    return res;
  }
  @Post('/save')
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
    GroupsService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.whiteListSheet, // 设置 base ID
    });
    const res: any = { code: 400, message: 'fail', data: {} };
    try {
      const resCreate: any = await GroupsService.create(body);
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
}
