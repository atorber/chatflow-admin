import { Injectable } from '@nestjs/common';
import { BaseEntity, MappingOptions } from '../../utils/vika-orm'; // 导入 BaseEntity, VikaOptions, 和 MappingOptions 类型/类

@Injectable()
export class ContactsService extends BaseEntity {
  name?: string; // 定义名字属性，可选

  id?: string;

  alias?: string;

  gender?: string;

  updated?: string;

  friend?: string;

  type?: string;

  avatar?: string;

  phone?: string;

  file?: string;

  // protected static override recordId: string = ''  // 定义记录ID，初始为空字符串

  protected static override mappingOptions: MappingOptions = {
    // 定义字段映射选项
    fieldMapping: {
      // 字段映射
      alias: '备注名称|alias',
      id: '好友ID|id',
      name: '好友昵称|name',
      gender: '性别|gender',
      updated: '更新时间|updated',
      friend: '是否好友|friend',
      type: '类型|type',
      avatar: '头像|avatar',
      phone: '手机号|phone',
      file: '头像图片|file',
    },
    tableName: '好友列表|Contact', // 表名
  };

  protected static override getMappingOptions(): MappingOptions {
    // 获取映射选项的方法
    return this.mappingOptions; // 返回当前类的映射选项
  }

  static override setMappingOptions(options: MappingOptions) {
    // 设置映射选项的方法
    this.mappingOptions = options; // 更新当前类的映射选项
  }
}
