export const vikaFields = {
  code: 200,
  success: true,
  data: {
    fields: [
      {
        id: 'fldWkMiBW8gpa',
        name: '代码',
        type: 'SingleText',
        property: { defaultValue: '' },
        editable: true,
        isPrimary: true,
      },
      {
        id: 'fldcGTEVtS42p',
        name: '名称',
        type: 'SingleText',
        property: {},
        editable: true,
      },
      {
        id: 'fldH9hsTEq90i',
        name: '持仓数量',
        type: 'Number',
        property: { precision: 0 },
        editable: true,
      },
      {
        id: 'fldshCPyNEac9',
        name: '成本',
        type: 'Number',
        property: { precision: 2 },
        editable: true,
      },
      {
        id: 'fldGB44mUw4tz',
        name: '更新日期',
        type: 'DateTime',
        property: {
          format: 'YYYY-MM-DD HH:mm',
          includeTime: true,
          autoFill: true,
        },
        editable: true,
      },
    ],
  },
  message: 'SUCCESS',
};
