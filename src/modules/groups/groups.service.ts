import { Injectable } from '@nestjs/common';
import { BaseEntity, MappingOptions } from '../../utils/vika-orm'; // 导入 BaseEntity, VikaOptions, 和 MappingOptions 类型/类

@Injectable()
export class GroupsService extends BaseEntity {
  groupName: string; // 定义名字属性，可选
  name: string;
  id: string;
  alias: string;

  // protected static override recordId: string = ''  // 定义记录ID，初始为空字符串

  protected static override mappingOptions: MappingOptions = {
    // 定义字段映射选项
    fieldMapping: {
      // 字段映射
      groupName: '分组名称|groupName',
      name: '好友昵称|name',
      alias: '备注名称|alias',
      id: '好友ID|id',
    },
    tableName: '分组|Group', // 表名
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
