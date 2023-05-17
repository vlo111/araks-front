export type NodeBody = {
  [x: string]: unknown;
};

export type NodeDataSubmit = {
  project_id?: string;
  project_type_id: string;
  nodes?: NodeBody;
  nodeId?: string;
};

export type NodeDataResponse = {
  id: string;
  project_type_id: string;
  project_id: string;
  user_id: string;
  nodes?: NodeBody;
};
