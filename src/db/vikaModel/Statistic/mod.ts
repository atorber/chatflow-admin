/* eslint-disable sort-keys */

import type {
  Sheet,
  // Field,
} from '../Model';

import { vikaFields } from './fields';
import { defaultRecords } from './records';

import { replaceSyncStatus, actionState } from '../actionBar';

const name = '统计打卡|Statistic';
const code = 'statisticSheet';

let fields: any = vikaFields.data.fields;

if (actionState[code]) {
  fields = replaceSyncStatus(fields);
}

export const sheet: Sheet = {
  fields,
  name,
  defaultRecords: defaultRecords.data.records,
};
