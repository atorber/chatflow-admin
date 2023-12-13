import { Injectable } from '@nestjs/common';
import { BaseEntity, MappingOptions } from '../../utils/vika-orm'; // 导入 BaseEntity, VikaOptions, 和 MappingOptions 类型/类
import { v4 } from 'uuid';

@Injectable()
export class RoomsService extends BaseEntity {
  topic?: string; // 定义名字属性，可选

  id?: string;

  alias?: string;

  updated?: string;

  avatar?: string;

  file?: string;

  // protected static override recordId: string = ''  // 定义记录ID，初始为空字符串

  protected static override mappingOptions: MappingOptions = {
    // 定义字段映射选项
    fieldMapping: {
      // 字段映射
      id: '群ID|id',
      topic: '群名称|topic',
      ownerId: '群主ID|ownerId',
      updated: '更新时间|updated',
      avatar: '头像|avatar',
      file: '头像图片|file',
    },
    tableName: '群列表|Room', // 表名
  }; // 设置映射选项为上面定义的 mappingOptions

  protected static override getMappingOptions(): MappingOptions {
    // 获取映射选项的方法
    return this.mappingOptions; // 返回当前类的映射选项
  }

  static override setMappingOptions(options: MappingOptions) {
    // 设置映射选项的方法
    this.mappingOptions = options; // 更新当前类的映射选项
  }
  static formatMsgToWechaty(roomid: string) {
    const msg = {
      reqId: v4(),
      method: 'thing.command.invoke',
      version: '1.0',
      timestamp: new Date().getTime(),
      name: 'memberAllGet',
      params: {
        roomid: roomid,
      },
    };
    return JSON.stringify(msg);
  }
}
