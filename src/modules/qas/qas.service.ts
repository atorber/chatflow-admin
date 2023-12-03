import { Injectable } from '@nestjs/common';
import { BaseEntity, MappingOptions } from '../../utils/vika-orm'; // 导入 BaseEntity, VikaOptions, 和 MappingOptions 类型/类

@Injectable()
export class QasService extends BaseEntity {
  skillname?: string; // 定义名字属性，可选
  title?: string;
  question1?: string;
  question2?: number;
  answer?: string;

  state?: string;
  syncStatus?: string;
  lastOperationTime?: string;
  action?: string;

  // protected static override recordId: string = ''  // 定义记录ID，初始为空字符串

  protected static override mappingOptions: MappingOptions = {
    // 定义字段映射选项
    fieldMapping: {
      // 字段映射
      skillname: '分类|skillname',
      title: '标准问题|title',
      question1: '相似问题1(选填)|question1',
      question2: '相似问题2(选填)|question2',
      answer: '机器人回答|answer',
      state: '启用状态|state',
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
