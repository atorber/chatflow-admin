import { Injectable } from '@nestjs/common';
import { BaseEntity, MappingOptions } from '../../utils/vika-orm'; // 导入 BaseEntity, VikaOptions, 和 MappingOptions 类型/类
import { v4 } from 'uuid';

@Injectable()
export class ChatsService extends BaseEntity {
  timeHms?: string;

  name?: string;

  alias?: string;

  topic?: string;

  listener?: string;

  messagePayload?: string;

  file?: any;

  messageType?: string;

  wxid?: string;

  roomid?: string;

  messageId?: string;

  wxAvatar?: string;

  roomAvatar?: string;

  listenerAvatar?: string;

  // protected static override recordId: string = ''  // 定义记录ID，初始为空字符串

  protected static override mappingOptions: MappingOptions = {
    // 定义字段映射选项
    fieldMapping: {
      // 字段映射
      timeHms: '时间|timeHms',
      name: '发送者|name',
      alias: '好友备注|alias',
      topic: '群名称|topic',
      listener: '接收人|listener',
      messagePayload: '消息内容|messagePayload',
      file: '文件图片|file',
      messageType: '消息类型|messageType',
      wxid: '好友ID|wxid',
      listenerid: '接收人ID|listenerid',
      roomid: '群ID|roomid',
      messageId: '消息ID|messageId',
      wxAvatar: '发送者头像|wxAvatar',
      roomAvatar: '群头像|roomAvatar',
      listenerAvatar: '接收人头像|listenerAvatar',
    },
    tableName: '消息记录|Message', // 表名
  }; // 设置映射选项为上面定义的 mappingOptions

  protected static override getMappingOptions(): MappingOptions {
    // 获取映射选项的方法
    return this.mappingOptions; // 返回当前类的映射选项
  }

  static override setMappingOptions(options: MappingOptions) {
    // 设置映射选项的方法
    this.mappingOptions = options; // 更新当前类的映射选项
  }

  static formatMsgToWechaty(data: any) {
    // {"type":"text","content":"ok","quote_id":"","mention":{"all":0,"uids":[]},"receiver":{"receiver_id":"wxid_pnza7m7kf9tq12","talk_type":1}}
    // {"type":"image","width":1024,"height":1024,"url":"https://im.gzydong.com/public/media/image/common/20231030/2143db60700049fd68ab44263cd8b2cc_1024x1024.png","size":10000,"receiver":{"receiver_id":"20889085065@chatroom","talk_type":2}}
    const msg_type = data.type;
    let messageType: any = 'Text';
    let messagePayload = '';

    switch (msg_type) {
      case 'text':
        messageType = 'Text';
        messagePayload = data.content;
        break;
      case 'image':
        messagePayload = data.url;
        messageType = 'Image';
        break;
      case 'Emoticon':
        messageType = 'Text';
        break;
      case 'ChatHistory':
        messageType = 'Text';
        break;
      case 'Audio':
        messageType = 4;
        break;
      case 'Attachment':
        messageType = 6;
        break;
      case 'Video':
        messageType = 5;
        break;
      case 'MiniProgram':
        messageType = 1;
        break;
      case 'Url':
        messageType = 1;
        break;
      case 'Recalled':
        messageType = 1;
        break;
      case 'RedEnvelope':
        messageType = 1;
        break;
      case 'Contact':
        messageType = 1;
        break;
      case 'Location':
        messageType = 1;
        break;
      default:
        messageType = 'Text';
        break;
    }
    const msg = {
      reqId: v4(),
      method: 'thing.command.invoke',
      version: '1.0',
      timestamp: new Date().getTime(),
      name: 'send',
      params: {
        toContacts: [
          data.receiver.receiver_id,
          // "5550027590@chatroom",
        ],
        messageType: messageType,
        messagePayload: messagePayload,
      },
    };
    return JSON.stringify(msg);
  }
}
