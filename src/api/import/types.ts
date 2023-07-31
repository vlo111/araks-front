import { DataResultItem, SetImportRule } from 'context/import-context';

export type ImportNodesRequest = {
  rule: SetImportRule;
  data: DataResultItem[];
};
