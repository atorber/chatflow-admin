import { Injectable } from '@nestjs/common';
import { BaseEntity, MappingOptions } from '../../utils/vika-orm'; // 导入 BaseEntity, VikaOptions, 和 MappingOptions 类型/类

@Injectable()
export class ChatbotsService extends BaseEntity {
  id: string; // 定义名字属性，可选
  name: string;
  desc: string;
  type: string;
  model: string;
  prompt: string;
  quota: string;
  endpoint: string;
  key: string;

  // protected static override recordId: string = ''  // 定义记录ID，初始为空字符串

  protected static override mappingOptions: MappingOptions = {
    // 定义字段映射选项
    fieldMapping: {
      // 字段映射
      id: '机器人ID|id',
      name: '昵称|name',
      desc: '描述|desc',
      type: '类型|type',
      model: '模型|model',
      prompt: '系统提示词|prompt',
      quota: '配额|quota',
      endpoint: '接入点|endpoint',
      key: '密钥|key',
    },
    tableName: '智聊|Chatbot', // 表名
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

@Injectable()
export class ChatbotUserService extends BaseEntity {
  id: string; // 定义名字属性，可选
  botname: string;
  wxid: string;
  name: string;
  alias: string;
  prompt: string;
  quota: string;
  state: string;
  info: string;
  // protected static override recordId: string = ''  // 定义记录ID，初始为空字符串

  protected static override mappingOptions: MappingOptions = {
    // 定义字段映射选项
    fieldMapping: {
      // 字段映射
      id: '机器人ID|id',
      botname: '昵称|botname',
      wxid: '用户ID|wxid',
      name: '用户名称|name',
      alias: '好友备注(选填)|alias',
      prompt: '用户提示词|prompt',
      quota: '配额|quota',
      state: '启用状态|state',
      info: '备注|info',
    },
    tableName: '智聊用户|ChatbotUser', // 表名
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
