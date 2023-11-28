/* eslint-disable sort-keys */

/* eslint-disable sort-keys */

import type {
  Sheet,
  // Field,
} from '../Model';
import { vikaFields } from './fields';
import { defaultRecords } from './records';

export const stockSheet: Sheet = {
  fields: vikaFields.data.fields,
  name: '股票提醒|Stock',
  defaultRecords: defaultRecords.data.records,
};
