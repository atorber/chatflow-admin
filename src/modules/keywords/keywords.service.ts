import { Injectable } from '@nestjs/common';
import { BaseEntity, MappingOptions } from '../../utils/vika-orm'; // 导入 BaseEntity, VikaOptions, 和 MappingOptions 类型/类

@Injectable()
export class KeywordsService extends BaseEntity {
  desc?: string; // 定义名字属性，可选
  name?: string;
  type?: string;
  details?: string;

  // protected static override recordId: string = ''  // 定义记录ID，初始为空字符串

  protected static override mappingOptions: MappingOptions = {
    // 定义字段映射选项
    fieldMapping: {
      // 字段映射
      name: '指令名称|name',
      desc: '说明|desc',
      type: '类型|type',
      details: '详细说明|details',
    },
    tableName: '关键词|Keyword', // 表名
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
