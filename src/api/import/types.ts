import { DataResultItem, SetImportRule } from 'context/import-context';

export type ImportNodesRequest = {
  rule: SetImportRule;
  datas: DataResultItem[];
};
