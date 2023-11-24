import {
  Controller,
  Get,
  Request,
  UnauthorizedException,
  Query,
  Body,
  Post,
} from '@nestjs/common';
import { ChatsService } from './chats.service.js';
import { Store } from '../../db/store.js';

@Controller('api/v1/talk')
export class ChatsController {
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
    ChatsService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.messageSheet, // 设置 base ID
    });
    const res = await ChatsService.findAll();
    console.debug(res);
    const talks: any = {
      code: 200,
      message: 'success',
      data: {
        items: [
          {
            avatar:
              'https://im.gzydong.com/public/media/image/talk/20220221/447d236da1b5787d25f6b0461f889f76_96x96.png',
            id: 146,
            is_disturb: 0,
            is_online: 0,
            is_robot: 1,
            is_top: 0,
            msg_text: '[登录消息]',
            name: '登录助手',
            receiver_id: 4257,
            remark: '',
            talk_type: 1,
            unread_num: 0,
            updated_at: '2023-10-26 17:20:33',
          },
          {
            avatar: '',
            id: 34036,
            is_disturb: 0,
            is_online: 0,
            is_robot: 0,
            is_top: 0,
            msg_text: 'ok',
            name: '11111',
            receiver_id: 1028,
            remark: '',
            talk_type: 2,
            unread_num: 0,
            updated_at: '2023-10-26 18:00:57',
          },
          {
            avatar: '',
            id: 34062,
            is_disturb: 0,
            is_online: 0,
            is_robot: 0,
            is_top: 0,
            msg_text: '[群成员解除禁言消息]',
            name: '阿萨德',
            receiver_id: 1029,
            remark: '',
            talk_type: 2,
            unread_num: 0,
            updated_at: '2023-10-26 15:23:28',
          },
        ],
      },
    };

    const items = res
      .map((value: any) => {
        const {
          roomid,
          wxid,
          listenerid,
          messagePayload,
          name,
          alias,
          listener,
          timeHms,
          topic,
          wxAvatar,
          roomAvatar,
          listenerAvatar,
        } = value.fields;
        let id = '';
        let dispayname = '';
        let avatar = '';
        let receiver_id = '';

        if (roomid !== '--') {
          id = roomid;
          dispayname = topic;
          avatar = roomAvatar;
          receiver_id = roomid;
        } else if (listenerid === user.id) {
          id = wxid;
          dispayname = alias || name;
          avatar = wxAvatar;
          receiver_id = wxid;
        } else {
          id = listenerid;
          dispayname = listener;
          avatar = listenerAvatar;
          receiver_id = listenerid;
        }
        if (dispayname) {
          return {
            avatar:
              avatar ||
              'https://im.gzydong.com/public/media/image/talk/20220221/447d236da1b5787d25f6b0461f889f76_96x96.png',
            id: id,
            is_disturb: 0,
            is_online: 0,
            is_robot: 0,
            is_top: 0,
            msg_text: messagePayload,
            name: roomid !== '--' ? topic : dispayname,
            receiver_id: receiver_id,
            remark: '',
            talk_type: roomid !== '--' ? 2 : 1,
            unread_num: 0,
            updated_at: timeHms,
            recordId: value.recordId,
          };
        }
        return false;
      })
      .filter((item) => item !== false);

    // 过滤items对象数组中receiver_id相同的对象,只保留最新的一条
    const filteredItems = items.reduce((acc: any, curr: any) => {
      const existingItem = acc.find((item: any) => item.id === curr.id);
      if (existingItem) {
        if (existingItem.updated_at < curr.updated_at) {
          acc.splice(acc.indexOf(existingItem), 1, curr);
        }
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);

    talks.data.items = filteredItems;

    console.debug('ServeGetTalkList talks', talks.data.items.length);
    return talks;
  }

  @Get('records')
  async serveTalkRecords(
    @Request() req: any,
    @Query() data: any,
  ): Promise<any> {
    console.debug('ServeGetTalkRecords data', data);
    const user = req.user;
    console.debug(user);
    // console.debug(Store.users);
    const db = Store.findUser(user.userId);
    if (!db) {
      throw new UnauthorizedException();
    }
    // console.debug(db);
    ChatsService.setVikaOptions({
      apiKey: db.token,
      baseId: db.dataBaseIds.messageSheet, // 设置 base ID
    });

    data.record_id = db.id;
    const records = {
      code: 200,
      message: 'success',
      data: {
        items: [
          {
            id: 12013,
            sequence: 29,
            msg_id: '1d54eb03ebd146168bf92880b83f039c',
            talk_type: 1,
            msg_type: 1,
            user_id: 2055,
            receiver_id: 2053,
            nickname: '老牛逼了',
            avatar:
              'https://im.gzydong.com/public/media/image/avatar/20230530/f76a14ce98ca684752df742974f5473a_200x200.png',
            is_revoke: 0,
            is_mark: 0,
            is_read: 0,
            content: '000',
            created_at: '2023-09-16 00:49:07',
            extra: {},
          },
          {
            id: 12010,
            sequence: 28,
            msg_id: '40568d70349b2d01fe1898217bcc7cfa',
            talk_type: 1,
            msg_type: 4,
            user_id: 2055,
            receiver_id: 2053,
            nickname: '老牛逼了',
            avatar:
              'https://im.gzydong.com/public/media/image/avatar/20230530/f76a14ce98ca684752df742974f5473a_200x200.png',
            is_revoke: 0,
            is_mark: 0,
            is_read: 0,
            content: '',
            created_at: '2023-09-15 22:11:49',
            extra: {
              duration: 0,
              name: '',
              size: 245804,
              suffix: 'wav',
              url: 'https://im.gzydong.com/public/media/20230915/bad860440e5fb72974cb2426bead46d6.wav',
            },
          },
        ],
      },
    };

    // data = {
    //   record_id: loadConfig.minRecord,
    //   receiver_id: props.receiver_id,
    //   talk_type: props.talk_type,
    //   limit: 30,
    // }
    let res: any = [];

    if (data.talk_type === '2') {
      res = await ChatsService.findByField('roomid', data.receiver_id);
    } else {
      res = await ChatsService.findByQuery(
        `({接收人ID|listenerid}="${data.receiver_id}"&&{好友ID|wxid}="${data.record_id}")||({接收人ID|listenerid}="${data.record_id}"&&{好友ID|wxid}="${data.receiver_id}")`,
      );
    }
    console.debug('vika res', res);
    const items = res
      .map((value: any) => {
        const { recordId } = value;
        const {
          roomid,
          messagePayload,
          name,
          alias,
          timeHms,
          messageType,
          messageId,
          wxAvatar,
          file,
        } = value.fields;
        const { wxid, listenerid } = value.fields;
        const user_id = wxid;
        const dispayname = alias || name;
        const talk_type = roomid !== '--' ? 2 : 1;
        let msg_type = 1;
        let extra = {
          height: 6480,
          name: '',
          size: 0,
          suffix: '',
          url: 'https://im.gzydong.com/public/media/image/common/20231026/814423dea6ada99994ae87bb0fef545b_4480x6480.png',
          width: 4480,
        };
        const receiver_id = roomid !== '--' ? roomid : listenerid;
        if (file) {
          const file0 = file[0];

          // const fileBase64 = await downloadImage(file0)
          // console.debug(fileBase64)

          extra = {
            height: file0.height,
            name: file0.name,
            size: file0.size,
            suffix: file0.mimeType,
            url: file0.url,
            width: file0.width,
          };
        }

        switch (messageType) {
          case 'Text':
            msg_type = 1;
            break;
          case 'Image':
            msg_type = 3;
            break;
          case 'Emoticon':
            msg_type = 1;
            break;
          case 'ChatHistory':
            msg_type = 9;
            break;
          case 'Audio':
            msg_type = 4;
            break;
          case 'Attachment':
            msg_type = 6;
            break;
          case 'Video':
            msg_type = 5;
            break;
          case 'MiniProgram':
            msg_type = 1;
            break;
          case 'Url':
            msg_type = 1;
            break;
          case 'Recalled':
            msg_type = 1;
            break;
          case 'RedEnvelope':
            msg_type = 1;
            break;
          case 'Contact':
            msg_type = 1;
            break;
          case 'Location':
            msg_type = 1;
            break;
          case 'GroupNote':
            msg_type = 1;
            break;
          case 'Transfer':
            msg_type = 1;
            break;
          case 'Post':
            msg_type = 1;
            break;
          case 'qrcode':
            msg_type = 3;
            break;
          case 'Unknown':
            msg_type = 1;
            break;
          default:
            break;
        }

        if (dispayname) {
          const id = new Date(timeHms).getTime();
          return {
            id: id,
            sequence: id,
            msg_id: messageId,
            talk_type: talk_type,
            msg_type: msg_type,
            user_id: user_id,
            receiver_id: receiver_id,
            nickname: dispayname,
            avatar:
              wxAvatar ||
              'https://im.gzydong.com/public/media/image/talk/20220221/447d236da1b5787d25f6b0461f889f76_96x96.png',
            is_revoke: 0,
            is_mark: 0,
            is_read: 0,
            content: messagePayload,
            created_at: timeHms,
            extra: extra,
            recordId: recordId,
          };
        }
        return false;
      })
      .filter((item: boolean) => item !== false);
    records.data.items = items;
    console.debug('records', records.data.items.length);
    return records;
  }

  @Post('unread/clear')
  async clearUnread(@Body() body: any): Promise<any> {
    console.debug('ServeClearUnread', body);
    return { code: 200, message: 'success', data: {} };
  }

  @Post('talk/create')
  async createTalk(
    @Body() body: { receiver_id: string; talk_type: string },
  ): Promise<any> {
    console.debug('ServeCreateTalk', body);
    return {
      code: 200,
      message: 'success',
      data: {
        avatar:
          'https://im.gzydong.com/public/media/image/avatar/20230530/f76a14ce98ca684752df742974f5473a_200x200.png',
        id: 36127,
        is_disturb: 0,
        is_online: 0,
        is_robot: 0,
        is_top: 0,
        msg_text: '[系统消息]',
        name: '老牛逼了1',
        receiver_id: 2055,
        remark_name: '老牛逼了1',
        talk_type: 1,
        unread_num: 1,
        updated_at: '2023-11-24 17:44:29',
      },
    };
  }
}
