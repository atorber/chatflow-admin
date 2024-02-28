/* eslint-disable sort-keys */

/* eslint-disable sort-keys */

import type {
  Sheet,
  // Field,
} from '../Model';
import { vikaFields } from './fields';
import { defaultRecords } from './records';

export const groupSheet: Sheet = {
  fields: vikaFields.data.fields,
  name: '分组|Group',
  defaultRecords: defaultRecords.data.records,
};
