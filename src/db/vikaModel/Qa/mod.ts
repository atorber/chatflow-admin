/* eslint-disable sort-keys */

import type {
  Sheet,
  // Field,
} from '../Model';

import { vikaFields } from './fields';
import { defaultRecords } from './records';

import { replaceSyncStatus, actionState } from '../actionBar';

const name = '问答列表|Qa';
const code = 'qaSheet';

let fields: any = vikaFields.data.fields;

if (actionState[code]) {
  fields = replaceSyncStatus(fields);
}

export const sheet: Sheet = {
  fields,
  name,
  defaultRecords: defaultRecords.data.records,
};
