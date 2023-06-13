export type NodeBody = {
  [x: string]: unknown;
};

export type NodeBodySubmit = {
  project_type_property_id: string;
  project_type_property_type: string;
  nodes_data: (string | number)[];
};

export type NodeDataSubmit = {
  project_id?: string;
  project_type_id: string;
  nodes?: NodeBodySubmit[];
  nodeId?: string;
};

export type ResponseLocationType = {
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

export type NodeDataType = ResponseLocationType | string | number | boolean;

export type NodeDataTypes = NodeDataType[];

export type NodePropertiesValues = {
  id: string;
  dataset_id?: string;
  project_type_property_id?: string;
  project_type_property_type?: string;
  nodes_data?: NodeDataTypes;
  nodeType: {
    name: string;
    default_image: boolean;
    default_property: boolean;
    multiple_type: boolean;
  };
  project_type_id: string;
  user_id: string;
  project_id: string;
  created_at: string;
  updated_at: string;
};

export type NodeDataResponse = {
  id: string;
  properties?: NodePropertiesValues[];
};

export type NodeDataListResponse = {
  count: number;
  rows: NodeDataResponse[];
};
