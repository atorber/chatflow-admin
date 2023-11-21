/* eslint-disable sort-keys */

import type {
  Sheet,
  // Field,
} from '../Model'
import { vikaFields } from './fields.js'
import { defaultRecords } from './records.js'

import { replaceSyncStatus, actionState } from '../actionBar.js'

const name = '白名单|WhiteList'
const code = 'whiteListSheet'

let fields:any = vikaFields.data.fields

if (actionState[code]) {
  fields = replaceSyncStatus(fields)
}

export const sheet: Sheet = {
  fields,
  name,
  defaultRecords:defaultRecords.data.records,
}
