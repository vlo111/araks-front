export type ExcelType = {
  sheetName: 'string';
  data: Array<[string, string]>;
};

export type CsvType = {
  [x: string]: string;
};
