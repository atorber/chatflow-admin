import { Injectable } from '@nestjs/common';
import { BaseEntity, MappingOptions } from '../../utils/vika-orm'; // 导入 BaseEntity, VikaOptions, 和 MappingOptions 类型/类

@Injectable()
export class StatisticsService extends BaseEntity {
  _id?: string; // 定义名字属性，可选
  type?: string;
  startTime?: number;
  duration?: number;
  maximum?: number;
  cycle?: number;
  topic?: string;
  roomid?: string;
  active?: string;

  syncStatus?: string;
  lastOperationTime?: string;
  action?: string;
  // protected static override recordId: string = ''  // 定义记录ID，初始为空字符串

  protected static override mappingOptions: MappingOptions = {
    // 定义字段映射选项
    fieldMapping: {
      // 字段映射
      _id: '编号|_id',
      type: '类型|type',
      startTime: '开始时间(选填)|startTime',
      duration: '时长(小时，选填)|duration',
      maximum: '限制人数(选填)|maximum',
      cycle: '周期(选填)|cycle',
      topic: '关联群名称|topic',
      roomid: '关联群ID(选填)|roomid',
      active: '启用状态|active',
      syncStatus: '同步状态|syncStatus',
      lastOperationTime: '最后操作时间|lastOperationTime',
      action: '操作|action',
    },
    tableName: '问答列表|Qa', // 表名
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
