/* eslint-disable sort-keys */

/* eslint-disable sort-keys */

import type {
  Sheet,
  // Field,
} from '../Model';

const vikaFields = {
  code: 200,
  success: true,
  data: {
    fields: [
      {
        id: 'flduc4igEtLoQ',
        name: '指令名称|name',
        type: 'SingleText',
        property: { defaultValue: '' },
        editable: true,
        isPrimary: true,
      },
      { id: 'fldDb690A0L1E', name: '说明|desc', type: 'Text', editable: true },
      {
        id: 'fld4yqz6uYHkG',
        name: '类型|type',
        type: 'SingleSelect',
        property: {
          options: [
            {
              id: 'optYt6uOH8l0d',
              name: '系统指令',
              color: { name: 'deepPurple_0', value: '#E5E1FC' },
            },
            {
              id: 'optWlKdyBNqAu',
              name: '群指令',
              color: { name: 'indigo_0', value: '#DDE7FF' },
            },
            {
              id: 'optHxBUHWIqEM',
              name: '包含关键字',
              color: { name: 'blue_0', value: '#DDF5FF' },
            },
            {
              id: 'optyuKwsQmtwj',
              name: '等于关键字',
              color: { name: 'teal_0', value: '#D6F3E8' },
            },
          ],
        },
        editable: true,
      },
      {
        id: 'fldx5tKkVIDj7',
        name: '详细说明|details',
        type: 'Text',
        editable: true,
      },
    ],
  },
  message: 'SUCCESS',
};
const defaultRecords: any = {
  code: 200,
  success: true,
  data: {
    total: 15,
    records: [
      {
        recordId: 'recLbBbCd91mb',
        createdAt: 1694140017000,
        updatedAt: 1694170942000,
        fields: {
          '类型|type': '系统指令',
          '说明|desc': '获得操作指令集',
          '指令名称|name': '帮助',
          '详细说明|details': '获得操作指令集',
        },
      },
      {
        recordId: 'recvHeSWmXZvk',
        createdAt: 1694140017000,
        updatedAt: 1694170942000,
        fields: {
          '类型|type': '系统指令',
          '说明|desc': '更新系统环境变量配置',
          '指令名称|name': '更新配置',
          '详细说明|details':
            '更新系统配置，更改配置后需主动更新一次配置配置才会生效',
        },
      },
      {
        recordId: 'rec3hlDeA8LAw',
        createdAt: 1694140017000,
        updatedAt: 1694170942000,
        fields: {
          '类型|type': '系统指令',
          '说明|desc': '更新定时提醒任务',
          '指令名称|name': '更新定时提醒',
          '详细说明|details': '更新机器人的群列表和好友列表',
        },
      },
      {
        recordId: 'reclI661i824K',
        createdAt: 1694140017000,
        updatedAt: 1694170942000,
        fields: {
          '类型|type': '系统指令',
          '说明|desc': '更新机器人的群列表和好友列表',
          '指令名称|name': '更新通讯录',
          '详细说明|details': '下载通讯录xlsx表',
        },
      },
      {
        recordId: 'recnkrZdO3KGS',
        createdAt: 1694140017000,
        updatedAt: 1694170942000,
        fields: {
          '类型|type': '系统指令',
          '说明|desc': '更新群白名单',
          '指令名称|name': '更新白名单',
          '详细说明|details': '下载通知模板',
        },
      },
      {
        recordId: 'recZF6aKkfKtI',
        createdAt: 1694171389000,
        updatedAt: 1694171594000,
        fields: {
          '类型|type': '系统指令',
          '说明|desc': '更新活动列表',
          '指令名称|name': '更新活动',
          '详细说明|details': '更新活跃的活动到数据库',
        },
      },
      {
        recordId: 'recVX8alc15cS',
        createdAt: 1694171412000,
        updatedAt: 1694171548000,
        fields: {
          '类型|type': '系统指令',
          '说明|desc': '群发通知给群或好友',
          '指令名称|name': '群发通知',
          '详细说明|details':
            '将群发通知表中状态为待发送状态的全部消息进行群发',
        },
      },
      {
        recordId: 'rec4eHtkSLeVN',
        createdAt: 1694160064000,
        updatedAt: 1694170942000,
        fields: {
          '类型|type': '系统指令',
          '说明|desc': '问答列表更新到微信对话开放平台',
          '指令名称|name': '更新问答',
          '详细说明|details': '更新定时提醒任务',
        },
      },
      {
        recordId: 'reccHwKYG3fJv',
        createdAt: 1694171458000,
        updatedAt: 1694171575000,
        fields: {
          '类型|type': '系统指令',
          '说明|desc': '下载通讯录csv表',
          '指令名称|name': '下载csv通讯录',
          '详细说明|details': '下载csv格式的通讯录，包括群和好友',
        },
      },
      {
        recordId: 'recsjHdtuyRth',
        createdAt: 1694140017000,
        updatedAt: 1694170942000,
        fields: {
          '类型|type': '系统指令',
          '说明|desc': '下载通讯录xlsx表',
          '指令名称|name': '下载通讯录',
          '详细说明|details': '更新群白名单，白名单变动时需主动更新白名单',
        },
      },
      {
        recordId: 'rec2gI3L9wAOe',
        createdAt: 1694140017000,
        updatedAt: 1694170942000,
        fields: {
          '类型|type': '系统指令',
          '说明|desc': '下载通知模板',
          '指令名称|name': '下载通知模板',
          '详细说明|details': 'TBD当前群启用智能问答',
        },
      },
      {
        recordId: 'recZxLJbwXCiH',
        createdAt: 1694140017000,
        updatedAt: 1694170942000,
        fields: {
          '类型|type': '群指令',
          '说明|desc': 'TBD当前群启用智能问答',
          '指令名称|name': '启用问答',
          '详细说明|details': 'TBD当前群关闭智能问答',
        },
      },
      {
        recordId: 'recgsLQC7pZV4',
        createdAt: 1694140017000,
        updatedAt: 1694170942000,
        fields: {
          '类型|type': '群指令',
          '说明|desc': 'TBD当前群关闭智能问答',
          '指令名称|name': '关闭问答',
          '详细说明|details': '筛选车找人信息',
        },
      },
      {
        recordId: 'recRNDWA0X5km',
        createdAt: 1694140017000,
        updatedAt: 1694170942000,
        fields: {
          '类型|type': '等于关键字',
          '说明|desc': '筛选车找人信息',
          '指令名称|name': '车找人',
          '详细说明|details': '匹配人找车信息',
        },
      },
      {
        recordId: 'recgmfoHSUNO7',
        createdAt: 1694140018000,
        updatedAt: 1694140018000,
        fields: {
          '类型|type': '包含关键字',
          '说明|desc': '匹配人找车信息',
          '指令名称|name': '人找车',
        },
      },
    ],
    pageNum: 1,
    pageSize: 15,
  },
  message: 'SUCCESS',
};

export const keywordSheet: Sheet = {
  fields: vikaFields.data.fields,
  name: '关键词|Keyword',
  defaultRecords: defaultRecords.data.records,
};
