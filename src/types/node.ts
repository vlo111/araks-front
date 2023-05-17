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
  type_id: string;
  name: string;
  target_id: string;
  target_attribute_id: string;
  source_id: string;
  source_attribute_id: string;
  inverse: boolean;
  multiple: boolean;
  target: {
    id: string;
    name: string;
    color: string;
  };
  source: {
    id: string;
    name: string;
    color: string;
  };
};
