/* eslint-disable sort-keys */

import type {
  Sheet,
  // Field,
} from '../Model';

import { replaceSyncStatus, actionState } from '../actionBar.js';

const name = '好友列表|Contact';
const code = 'contactSheet';

const vikaFields = {
  code: 200,
  success: true,
  data: {
    fields: [
      {
        id: 'fldQkY67dBZ4e',
        name: '好友ID|id',
        type: 'SingleText',
        property: {},
        editable: true,
        isPrimary: true,
      },
      {
        id: 'fldsQQJOJHIkX',
        name: '好友昵称|name',
        type: 'SingleText',
        property: { defaultValue: '' },
        editable: true,
      },
      {
        id: 'fldmnMANJ1IqN',
        name: '备注名称|alias',
        type: 'SingleText',
        property: { defaultValue: '' },
        editable: true,
      },
      {
        id: 'fld0CxvEhhO5A',
        name: '性别|gender',
        type: 'SingleText',
        property: { defaultValue: '' },
        editable: true,
      },
      {
        id: 'fldrAMLW8Ysg9',
        name: '更新时间|updated',
        type: 'SingleText',
        property: { defaultValue: '' },
        editable: true,
      },
      {
        id: 'fldZh6vCCEUb0',
        name: '是否好友|friend',
        type: 'Checkbox',
        property: { icon: '✅' },
        editable: true,
      },
      {
        id: 'fldj9vvNOciYB',
        name: '类型|type',
        type: 'SingleText',
        property: { defaultValue: '' },
        editable: true,
      },
      {
        id: 'fldkTLOkFxGdP',
        name: '头像|avatar',
        type: 'Text',
        editable: true,
      },
      {
        id: 'fldysArm2EbRI',
        name: '手机号|phone',
        type: 'SingleText',
        property: { defaultValue: '' },
        editable: true,
      },
      {
        id: 'fldYxqREKJ3Or',
        name: '头像图片|file',
        type: 'Attachment',
        editable: true,
      },
    ],
  },
  message: 'SUCCESS',
};
let fields: any = vikaFields.data.fields;

if (actionState[code]) {
  fields = replaceSyncStatus(fields);
}

const defaultRecords = {
  code: 200,
  success: true,
  data: { total: 0, records: [], pageNum: 1, pageSize: 0 },
  message: 'SUCCESS',
};

export const sheet: Sheet = {
  fields,
  name,
  defaultRecords: defaultRecords.data.records,
};
