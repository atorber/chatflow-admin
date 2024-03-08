// import { BiTable } from './vika-db.js';
// import { BaseEntity, MappingOptions } from './vika-orm.js';

import { BiTable } from './lark-db.js';
import { BaseEntity, MappingOptions } from './lark-orm.js';

export { BiTable, BaseEntity, MappingOptions };

export interface DateBase {
  messageSheet: string;
  keywordSheet: string;
  contactSheet: string;
  roomSheet: string;
  envSheet: string;
  whiteListSheet: string;
  noticeSheet: string;
  statisticSheet: string;
  orderSheet: string;
  stockSheet: string;
  groupNoticeSheet: string;
  qaSheet: string;
  chatBotSheet: string;
  chatBotUserSheet: string;
  groupSheet: string;
  welcomeSheet: string;
  mediaSheet: string;
  carpoolingSheet: string;
}

export type BiTableConfig = {
  spaceId: string;
  token: string;
};
