import { DataResultItem, SetImportRule } from 'context/import-context';

export type ImportNodesRequest = {
  rule: SetImportRule;
  datas: DataResultItem[];
};

type SuccessType = {
  id: string;
  project_id: string;
  project_type_id: string;
  user_id: string;
  name: string;
  updated_at: string;
  created_at: string;
  default_image: null;
};

export type ImportNodesResponse = {
  success: SuccessType[];
  warnings: string[];
};
