export type NodeBody = {
  [x: string]: unknown;
};

export type NodeBodySubmit = {
  project_type_property_id: string;
  project_type_property_name: string;
  nodes_data: (string | number)[];
};

export type NodeDataSubmit = {
  project_id?: string;
  project_type_id: string;
  nodes?: NodeBodySubmit[];
  nodeId?: string;
};

export type NodeDataResponse = {
  id: string;
  project_type_id: string;
  project_id: string;
  user_id: string;
  nodes?: NodeBody;
};
