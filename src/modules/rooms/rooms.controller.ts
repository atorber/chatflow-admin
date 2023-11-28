import {
  Body,
  Controller,
  Get,
  Post,
  Query,
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
    // console.debug(res);
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

  @Get('detail')
  async findOne(@Query() query: { group_id: string }): Promise<string> {
    console.debug(query);
    const id = query.group_id;
    console.debug('id', id);
    let group: any = {
      code: 200,
      message: 'success',
      data: {
        avatar: '',
        created_at: '2023-10-20 11:09:48',
        group_id: 1012,
        group_name: '测试一下',
        is_disturb: 0,
        is_manager: true,
        is_mute: 0,
        is_overt: 0,
        profile: '',
        visit_card: '',
      },
    };
    const res: any[] = await RoomsService.findByField('id', id);
    let item = {};
    if (res.length > 0) {
      const groupInfo = res[0].fields;
      item = {
        avatar:
          groupInfo.avatar ||
          'http://localhost:5173/files/public/media/image/avatar/20231022/4f67de6461b9e930be9ac97b3a6cee4c_200x200.png',
        creator_id: groupInfo.ownerId,
        group_name: groupInfo.topic,
        id: groupInfo.id,
        is_disturb: 0,
        leader: 2,
        profile: '',
        recordId: groupInfo.recordId,
      };
      group.data = item;
    } else {
      group = {
        code: 305,
        message: `strconv.ParseInt: parsing "${id}": value out of range`,
      };
    }

    console.debug(group);
    return group;
  }

  @Post('create')
  async createGroup(
    @Body()
    body: {
      avatar: string;
      name: string;
      profile: string;
      ids: string;
    },
  ): Promise<any> {
    // {
    //   "avatar": "",
    //   "name": "测试群",
    //   "profile": "",
    //   "ids": "2055,3019,3045"
    // }
    console.debug(body);
    return { code: 200, message: 'success', data: { group_id: 1040 } };
  }

  @Post('invite')
  async memberInvite(
    @Body() body: { group_id: string; ids: string },
  ): Promise<any> {
    console.debug(body);
    return { code: 200, message: 'success', data: {} };
  }

  @Get('member/list')
  async findMembers(@Query() query: { group_id: string }): Promise<any> {
    console.debug(query);
    return {
      code: 200,
      message: 'success',
      data: {
        items: [
          {
            avatar:
              'https://im.gzydong.com/public/media/image/avatar/20231118/14dc84cf4870945cfb02e59d40691e54_200x200.png',
            gender: 1,
            is_mute: 0,
            leader: 2,
            nickname: 'ssss',
            remark: '',
            user_id: 2054,
          },
          {
            avatar:
              'https://im.gzydong.com/public/media/image/talk/20230527/4a1ec2956101ba8151cfa7074263ba17_500x500.png',
            gender: 0,
            is_mute: 0,
            leader: 0,
            nickname: '荀刚',
            remark: '',
            user_id: 3019,
          },
          {
            avatar:
              'https://im.gzydong.com/public/media/image/talk/20230527/4a1ec2956101ba8151cfa7074263ba17_500x500.png',
            gender: 0,
            is_mute: 0,
            leader: 0,
            nickname: '滕霭',
            remark: '',
            user_id: 3045,
          },
          {
            avatar:
              'https://im.gzydong.com/public/media/image/talk/20230527/4a1ec2956101ba8151cfa7074263ba17_500x500.png',
            gender: 0,
            is_mute: 0,
            leader: 0,
            nickname: '陆宇',
            remark: '',
            user_id: 3063,
          },
          {
            avatar:
              'https://im.gzydong.com/public/media/image/talk/20230527/4a1ec2956101ba8151cfa7074263ba17_500x500.png',
            gender: 0,
            is_mute: 0,
            leader: 0,
            nickname: '颜希',
            remark: '',
            user_id: 4031,
          },
          {
            avatar:
              'https://im.gzydong.com/public/media/image/talk/20230527/4a1ec2956101ba8151cfa7074263ba17_500x500.png',
            gender: 0,
            is_mute: 0,
            leader: 0,
            nickname: '戚青',
            remark: '',
            user_id: 4042,
          },
          {
            avatar:
              'https://im.gzydong.com/public/media/image/talk/20230527/4a1ec2956101ba8151cfa7074263ba17_500x500.png',
            gender: 0,
            is_mute: 0,
            leader: 0,
            nickname: '廖彬',
            remark: '',
            user_id: 4101,
          },
          {
            avatar:
              'https://im.gzydong.com/public/media/image/talk/20230527/4a1ec2956101ba8151cfa7074263ba17_500x500.png',
            gender: 0,
            is_mute: 0,
            leader: 0,
            nickname: '柯烟',
            remark: '',
            user_id: 4107,
          },
        ],
      },
    };
  }

  @Get('member/invites')
  async findInvites(@Query() query: { group_id: any }): Promise<any> {
    console.debug(query);
    return {
      code: 200,
      message: 'success',
      data: [
        {
          id: 2055,
          nickname: '老牛逼了1',
          gender: 2,
          motto: '是的发送到发送到发',
          avatar:
            'https://im.gzydong.com/public/media/image/avatar/20230530/f76a14ce98ca684752df742974f5473a_200x200.png',
          friend_remark: '老牛逼了1',
          is_online: 0,
          group_id: 30,
        },
        {
          id: 3084,
          nickname: '谭珊',
          gender: 0,
          motto: '',
          avatar:
            'https://im.gzydong.com/public/media/image/talk/20230527/4a1ec2956101ba8151cfa7074263ba17_500x500.png',
          friend_remark: '远东',
          is_online: 0,
          group_id: 30,
        },
        {
          id: 4044,
          nickname: '罗宽',
          gender: 0,
          motto: '',
          avatar:
            'https://im.gzydong.com/public/media/image/talk/20230527/4a1ec2956101ba8151cfa7074263ba17_500x500.png',
          friend_remark: '阿林',
          is_online: 0,
          group_id: 30,
        },
        {
          id: 4045,
          nickname: '易平',
          gender: 0,
          motto: '',
          avatar:
            'https://im.gzydong.com/public/media/image/talk/20230527/4a1ec2956101ba8151cfa7074263ba17_500x500.png',
          friend_remark: 'njnkjn',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4046,
          nickname: '何鸿',
          gender: 0,
          motto: '',
          avatar:
            'https://im.gzydong.com/public/media/image/talk/20230527/4a1ec2956101ba8151cfa7074263ba17_500x500.png',
          friend_remark: 'jnknksnfka ',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4066,
          nickname: '龚雁',
          gender: 0,
          motto: '',
          avatar:
            'https://im.gzydong.com/public/media/image/talk/20230527/4a1ec2956101ba8151cfa7074263ba17_500x500.png',
          friend_remark: '2054阿斯顿11',
          is_online: 0,
          group_id: 37,
        },
        {
          id: 4070,
          nickname: '雍和',
          gender: 1,
          motto:
            '生活需要梦想、需要坚持。只有不断提高自我，才会得到想要的生活...',
          avatar:
            'https://im.gzydong.com/public/media/image/talk/20230527/4a1ec2956101ba8151cfa7074263ba17_500x500.png',
          friend_remark: '尽快吧111',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4071,
          nickname: '陈顺',
          gender: 1,
          motto:
            '生活需要梦想、需要坚持。只有不断提高自我，才会得到想要的生活...',
          avatar:
            'https://im.gzydong.com/public/media/image/avatar/20230720/9a41d5ff6d644151a187a55248c591b3_200x200.png',
          friend_remark: '',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4109,
          nickname: '习平',
          gender: 0,
          motto: '',
          avatar:
            'https://im.gzydong.com/public/media/image/talk/20230527/4a1ec2956101ba8151cfa7074263ba17_500x500.png',
          friend_remark: '开幕',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4192,
          nickname: '步群',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: 'chengtg',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4214,
          nickname: '曹艳',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: '1333',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4216,
          nickname: '濮阳咏',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: 'aaa',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4218,
          nickname: '彭萍',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: 'ADMIN123',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4225,
          nickname: '舒悦',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: '123ssssssssss',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4283,
          nickname: '宁小',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: '测试',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4292,
          nickname: '寇航',
          gender: 0,
          motto: 'nananana',
          avatar:
            'https://im.gzydong.com/public/media/image/avatar/20220819/44ec10a91e9a85bcaf2a9b7751b9559f_200x200.png',
          friend_remark: 'elus',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4362,
          nickname: '倪滢',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: 'xinghai2227',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4364,
          nickname: '郝朗',
          gender: 0,
          motto: '中国人东方龙',
          avatar:
            'https://im.gzydong.com/public/media/image/avatar/20221226/8eb59ad648d4890e31e1b657adfcf2c3_200x200.png',
          friend_remark: '老汤150',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4365,
          nickname: '葛逸',
          gender: 0,
          motto: '福建是我的家乡',
          avatar:
            'https://im.gzydong.com/public/media/image/avatar/20221226/3b1edbe666daf6af14aa0ea0566f1376_200x200.png',
          friend_remark: '',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4374,
          nickname: '路威',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: 'AIDynamic',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4409,
          nickname: 'xiaoke',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: 'xiaoke',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4419,
          nickname: 'wolfdown',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: 'wolfdown',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4423,
          nickname: '13800012345',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: '000',
          is_online: 0,
          group_id: 29,
        },
        {
          id: 4455,
          nickname: '123456',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: '123456',
          is_online: 0,
          group_id: 30,
        },
        {
          id: 4461,
          nickname: '3232',
          gender: 0,
          motto: '',
          avatar:
            'https://im.gzydong.com/public/media/image/avatar/20230527/4936928b67651f9a3fa753f7fd5f266d_200x200.png',
          friend_remark: '3232',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4480,
          nickname: '七友',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: '七友',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4482,
          nickname: 'chebu',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: 'chebu',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4485,
          nickname: '233',
          gender: 0,
          motto: '',
          avatar:
            'https://im.gzydong.com/public/media/image/avatar/20230616/ee0e8ae0d1d308db6cec8bc2fa86fc85_200x200.png',
          friend_remark: '233',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4496,
          nickname: '18010472947',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: '18010472947',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4500,
          nickname: '123123',
          gender: 0,
          motto: '123321',
          avatar:
            'https://im.gzydong.com/public/media/image/avatar/20230625/c5f59635ec7cead6bb8e1b85eb94e4eb_200x200.png',
          friend_remark: '',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4520,
          nickname: '测试1111',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: '测试1111',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4523,
          nickname: '我是',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: '杨大大',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4532,
          nickname: '123',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: '123',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4533,
          nickname: '123456',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: '123456',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4542,
          nickname: 'risa',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: 'risa',
          is_online: 0,
          group_id: 0,
        },
        {
          id: 4557,
          nickname: '梦醒',
          gender: 0,
          motto: '',
          avatar: '',
          friend_remark: '梦醒',
          is_online: 0,
          group_id: 0,
        },
      ],
    };
  }

  @Post('member/remark')
  async memberRemark(
    @Body() body: { group_id: string; visit_card: string },
  ): Promise<any> {
    console.debug(body);
    return { code: 200, message: 'success' };
  }

  // 公开群列表, 未实现
  @Get('overt/list')
  async findOvert(
    @Request() req: any,
    @Query() query: { page: number; name?: string },
  ): Promise<string> {
    console.debug(query);
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
    // console.debug(res);
    let groups: any = {
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
    groups = {
      code: 200,
      message: 'success',
      data: {
        items: [
          {
            avatar: '',
            count: 2,
            created_at: '2023-11-01 10:04:38',
            id: 1033,
            is_member: false,
            max_num: 200,
            name: '222',
            profile: '',
            type: 1,
          },
          {
            avatar: '',
            count: 8,
            created_at: '2023-10-28 10:09:52',
            id: 1031,
            is_member: false,
            max_num: 200,
            name: '新群2222',
            profile: '',
            type: 1,
          },
          {
            avatar: '',
            count: 7,
            created_at: '2023-10-26 15:23:14',
            id: 1029,
            is_member: false,
            max_num: 200,
            name: '阿萨德',
            profile: '',
            type: 1,
          },
          {
            avatar: '',
            count: 8,
            created_at: '2023-09-09 14:26:49',
            id: 994,
            is_member: false,
            max_num: 200,
            name: '非常滴牛逼',
            profile: '',
            type: 1,
          },
          {
            avatar: '',
            count: 6,
            created_at: '2023-08-08 21:11:32',
            id: 974,
            is_member: false,
            max_num: 200,
            name: '测试拒绝',
            profile: '',
            type: 1,
          },
          {
            avatar: '',
            count: 12,
            created_at: '2023-07-18 15:42:41',
            id: 961,
            is_member: false,
            max_num: 200,
            name: '9898',
            profile: '',
            type: 1,
          },
          {
            avatar: '',
            count: 5,
            created_at: '2023-07-13 14:16:07',
            id: 959,
            is_member: false,
            max_num: 200,
            name: 'xxxxxx',
            profile: '',
            type: 1,
          },
          {
            avatar: '',
            count: 8,
            created_at: '2023-06-30 15:23:17',
            id: 946,
            is_member: false,
            max_num: 200,
            name: '111',
            profile: '',
            type: 1,
          },
          {
            avatar: '',
            count: 7,
            created_at: '2023-06-25 19:22:10',
            id: 938,
            is_member: false,
            max_num: 200,
            name: '阿萨德撒多',
            profile: '',
            type: 1,
          },
          {
            avatar: '',
            count: 2,
            created_at: '2023-06-22 23:56:57',
            id: 937,
            is_member: false,
            max_num: 200,
            name: '群主之家',
            profile: '',
            type: 1,
          },
          {
            avatar: '',
            count: 2,
            created_at: '2023-03-24 15:00:59',
            id: 852,
            is_member: false,
            max_num: 200,
            name: '老孙飒飒大都是',
            profile: '',
            type: 1,
          },
          {
            avatar: '',
            count: 24,
            created_at: '2022-04-05 15:31:31',
            id: 327,
            is_member: false,
            max_num: 200,
            name: '检测',
            profile: '',
            type: 1,
          },
          {
            avatar: '',
            count: 10,
            created_at: '2022-04-05 15:30:58',
            id: 326,
            is_member: false,
            max_num: 200,
            name: '问那就看三看法',
            profile: '',
            type: 1,
          },
          {
            avatar: '',
            count: 7,
            created_at: '2022-04-04 14:37:34',
            id: 325,
            is_member: false,
            max_num: 200,
            name: '安稳科技',
            profile: '',
            type: 1,
          },
          {
            avatar: '',
            count: 7,
            created_at: '2022-04-04 14:18:32',
            id: 324,
            is_member: false,
            max_num: 200,
            name: '字码',
            profile: '',
            type: 1,
          },
          {
            avatar: '',
            count: 11,
            created_at: '2022-04-04 13:41:49',
            id: 323,
            is_member: false,
            max_num: 200,
            name: '问那就开始发那即可',
            profile: '',
            type: 1,
          },
          {
            avatar: '',
            count: 8,
            created_at: '2022-04-04 13:40:07',
            id: 322,
            is_member: false,
            max_num: 200,
            name: '请问您及安顺科技那拿手机发',
            profile: '',
            type: 1,
          },
          {
            avatar: '',
            count: 5,
            created_at: '2022-04-04 13:39:32',
            id: 321,
            is_member: false,
            max_num: 200,
            name: '我能加速',
            profile: '',
            type: 1,
          },
          {
            avatar:
              'https://im.gzydong.com/public/media/image/avatar/20231114/f77cde915eb095c96b25e906e42423b2_200x200.png',
            count: 60,
            created_at: '2022-01-26 22:43:40',
            id: 318,
            is_member: false,
            max_num: 200,
            name: '新万人群  不要瞎搞 保持不变 谢谢配合',
            profile: '',
            type: 1,
          },
        ],
        next: true,
      },
    };
    return groups;
  }

  // 申请入群
  @Post('apply/create')
  async create(
    @Body() body: { group_id: string; remark: string },
  ): Promise<any> {
    console.debug('create', body);
    return { code: 200, message: 'success' };
  }

  // 入群申请记录
  @Get('apply/records')
  async findApplyRecords(@Request() req: any): Promise<string> {
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
      baseId: db.dataBaseIds.contactSheet, // 设置 base ID
    });
    const res = await RoomsService.findAll();
    // console.debug(res);
    let contacts: any = {
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
    contacts = {
      code: 200,
      message: 'success',
      data: {
        items: [
          {
            avatar:
              'https://im.gzydong.com/public/media/image/avatar/20230530/f76a14ce98ca684752df742974f5473a_200x200.png',
            created_at: '2023-10-24 17:12:32',
            friend_id: 4559,
            id: 238,
            nickname: '老牛逼了1',
            remark: '123',
            user_id: 2055,
          },
        ],
      },
    };
    return contacts;
  }

  // 入群申请列表
  @Get('apply/all')
  async findApplyAll(@Request() req: any): Promise<string> {
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
      baseId: db.dataBaseIds.contactSheet, // 设置 base ID
    });
    const res = await RoomsService.findAll();
    // console.debug(res);
    let contacts: any = {
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
    contacts = { code: 200, message: 'success', data: { items: [] } };
    return contacts;
  }

  @Get('apply/unread')
  findUnread(): any {
    return { code: 200, message: 'success', data: { unread_num: 0 } };
  }

  @Get('apply/list')
  async findApplyList(@Query() query: { group_id: string }): Promise<any> {
    console.debug(query);
    return { code: 200, message: 'success', data: { items: [] } };
  }

  @Get('notice/list')
  async findNoticeList(@Query() query: { group_id: string }): Promise<any> {
    console.debug(query);
    return { code: 200, message: 'success', data: { items: [] } };
  }

  @Post('overt')
  async overt(@Body() body: { group_id: string; mode: 1 | 2 }): Promise<any> {
    console.debug(body);
    return { code: 200, message: 'success', data: {} };
  }

  @Post('mute')
  async mute(@Body() body: { group_id: string; mode: 1 | 2 }): Promise<any> {
    console.debug(body);
    return { code: 200, message: 'success', data: {} };
  }

  @Post('dismiss')
  async dismiss(@Body() body: { group_id: string }): Promise<any> {
    console.debug(body);
    return { code: 200, message: 'success' };
  }
}
