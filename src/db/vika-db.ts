/* eslint-disable sort-keys */
import { ICreateRecordsReqParams, Vika } from '@vikadata/vika';
import type { Sheets } from './vikaModel/Model.js';
import { sheets } from './vikaModel/index.js';
import { delay } from '../utils/utils.js';

export type VikaConfig = {
  spaceName: string;
  token: string;
};

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
}

export class KeyDisplaynameMap {
  private map: Map<string, string>;
  private reverseMap: Map<string, string>;

  constructor(fields: any[]) {
    const initPairs: [string, string][] = fields.map((fields: any) => {
      return this.transformKey(fields.name);
    });
    this.reverseMap = new Map(initPairs);
    this.map = new Map(initPairs.map(([key, value]) => [value, key]));
  }

  transformKey(key: string): [string, string] {
    return [key, key.split('|')[1] || key];
  }

  getKey(value: string): string | undefined {
    return this.reverseMap.get(value);
  }

  getValue(key: string): string | undefined {
    return this.map.get(key);
  }
}

export class VikaDB {
  spaceName: string;
  token: string;
  vika: Vika;
  spaceId: string | undefined;
  dataBaseIds: DateBase;
  dataBaseNames: DateBase;
  isReady: boolean = true;

  constructor(config?: VikaConfig) {
    if (config) this.init(config);
  }
  async init(config: VikaConfig) {
    console.info('初始化检查系统表...');
    this.spaceName = config.spaceName;
    this.vika = new Vika({ token: config.token });
    this.token = config.token;
    this.spaceId = '';
    this.dataBaseIds = {
      messageSheet: '',
      keywordSheet: '',
      contactSheet: '',
      roomSheet: '',
      envSheet: '',
      whiteListSheet: '',
      noticeSheet: '',
      statisticSheet: '',
      orderSheet: '',
      stockSheet: '',
      groupNoticeSheet: '',
      qaSheet: '',
    };
    this.dataBaseNames = { ...this.dataBaseIds };

    try {
      const space = await this.getSpaceId();
      if (space.code === 200) {
        const tables = await this.getNodesList();
        console.info(
          '维格表文件列表：\n',
          JSON.stringify(tables, undefined, 2),
        );

        await delay(1000);

        for (const k in sheets) {
          // console.info(this)
          const sheet = sheets[k as keyof Sheets];
          // console.info('数据模型：', k, sheet)
          if (sheet && !tables[sheet.name]) {
            console.info(`缺少数据表...\n${k}/${sheet.name}`);
            this.isReady = false;
            return false;
          } else if (sheet) {
            // console.info(`表已存在：\n${k}/${sheet.name}/${tables[sheet.name]}`)
            this.dataBaseIds[k as keyof DateBase] = tables[sheet.name];
            this.dataBaseNames[k as keyof DateBase] = sheet.name;
          }
        }
        console.info('初始化表完成...');
        return space;
      } else {
        console.info(
          '指定空间不存在，请先创建空间，并在.env文件或环境变量中配置vika信息...',
        );
        return space;
      }
    } catch (error) {
      console.error('获取空间ID失败：', error);
      return error;
    }
    // console.info('空间ID:', this.spaceId)
  }

  async getAllSpaces() {
    // 获取当前用户的空间站列表
    const spaceListResp = await this.vika.spaces.list();
    if (spaceListResp.success) {
      // console.info(spaceListResp.data.spaces)
      return spaceListResp.data.spaces;
    } else {
      console.error('获取空间列表失败:', spaceListResp);
      return spaceListResp;
    }
  }

  async getSpaceId() {
    const spaceList: any = await this.getAllSpaces();
    for (const i in spaceList) {
      if (spaceList[i].name === this.spaceName) {
        this.spaceId = spaceList[i].id;
        break;
      }
    }
    if (this.spaceId) {
      return { success: true, code: 200, data: this.spaceId };
    } else {
      return spaceList;
    }
  }

  async getNodesList() {
    if (this.spaceId) {
      // 获取指定空间站的一级文件目录
      const nodeListResp = await this.vika.nodes.list({
        spaceId: this.spaceId,
      });
      const tables: any = {};
      if (nodeListResp.success) {
        // console.info(nodeListResp.data.nodes);
        const nodes = nodeListResp.data.nodes;
        nodes.forEach((node: any) => {
          // 当节点是文件夹时，可以执行下列代码获取文件夹下的文件信息
          if (node.type === 'Datasheet') {
            tables[node.name] = node.id;
          }
        });
      } else {
        console.error('获取数据表失败:', nodeListResp);
      }
      return tables;
    } else {
      return {};
    }
  }

  async getDataBases() {
    return this.dataBaseIds;
  }

  async getVikaSheet(datasheetId: string) {
    const datasheet = await this.vika.datasheet(datasheetId);
    return datasheet;
  }

  async getSheetFields(datasheetId: string) {
    const datasheet = await this.vika.datasheet(datasheetId);
    const fieldsResp = await datasheet.fields.list();
    let fields: any = [];
    if (fieldsResp.success) {
      console.info(
        'getSheetFields获取字段：',
        JSON.stringify(fieldsResp.data.fields),
      );
      fields = fieldsResp.data.fields;
    } else {
      console.error('获取字段失败:', fieldsResp);
    }
    return fields;
  }

  async createDataSheet(
    key: string,
    name: string,
    fields: { name: string; type: string }[],
  ) {
    // console.info('创建表...')
    const datasheetRo = {
      fields,
      name,
    };

    if (this.spaceId) {
      try {
        const res: any = await this.vika
          .space(this.spaceId)
          .datasheets.create(datasheetRo);

        console.info(`系统表【${name}】创建结果:`, JSON.stringify(res));

        this.dataBaseIds[key as keyof DateBase] = res.data.id;
        this.dataBaseNames[name as keyof DateBase] = res.data.id;
        // console.info('创建表成功：', JSON.stringify(this.dataBaseIds))
        // 删除空白行
        await this.clearBlankLines(res.data.id);
        return res.data;
      } catch (error) {
        console.error(name, error);
        return error;
        // TODO: handle error
      }
    } else {
      return 'spaceId is undefined';
    }
  }

  async createRecord(datasheetId: string, records: ICreateRecordsReqParams) {
    // console.info('写入维格表:', records.length)
    const datasheet = await this.vika.datasheet(datasheetId);

    try {
      const res = await datasheet.records.create(records);
      if (res.success) {
        // console.info(res.data.records)
      } else {
        console.error('记录写入维格表失败：', res);
      }
    } catch (err) {
      console.error('请求维格表写入失败：', err);
    }
  }

  async updateRecord(
    datasheetId: string,
    records: {
      recordId: string;
      fields: { [key: string]: any };
    }[],
  ) {
    console.info('更新维格表记录:', records.length);
    const datasheet = await this.vika.datasheet(datasheetId);

    try {
      const res = await datasheet.records.update(records);
      if (!res.success) {
        console.error('记录更新维格表失败：', res);
      }
    } catch (err) {
      console.error('请求维格表更新失败：', err);
    }
  }

  async deleteRecords(datasheetId: string, recordsIds: string | any[]) {
    // console.info('操作数据表ID：', datasheetId)
    // console.info('待删除记录IDs：', recordsIds)
    const datasheet = this.vika.datasheet(datasheetId);
    const response = await datasheet.records.delete(recordsIds);
    if (response.success) {
      console.info(`删除${recordsIds.length}条记录`);
    } else {
      console.error('删除记录失败：', response);
    }
  }

  async getRecords(datasheetId: string, query: any = {}) {
    let records: any = [];
    query['pageSize'] = 1000;
    const datasheet = await this.vika.datasheet(datasheetId);
    // 分页获取记录，默认返回第一页
    const response = await datasheet.records.query(query);
    if (response.success) {
      records = response.data.records;
      // console.info(records)
    } else {
      console.error('获取数据记录失败：', JSON.stringify(response));
      records = response;
    }
    return records;
  }

  async getAllRecords(datasheetId: string) {
    let records: any = [];
    const datasheet = await this.vika.datasheet(datasheetId);
    const response: any = await datasheet.records.queryAll();
    // console.info('原始返回：',response)
    if (response.next) {
      for await (const eachPageRecords of response) {
        // console.info('eachPageRecords:',eachPageRecords.length)
        records.push(...eachPageRecords);
      }
      // console.info('records:',records.length)
    } else {
      console.error(response);
      records = response;
    }
    return records;
  }

  async clearBlankLines(datasheetId: any) {
    const records = await this.getRecords(datasheetId, {});
    // console.info(records)
    const recordsIds: any = [];
    for (const i in records) {
      recordsIds.push(records[i].recordId);
    }
    // console.info(recordsIds)
    await this.deleteRecords(datasheetId, recordsIds);
  }
}
