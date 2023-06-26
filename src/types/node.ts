export type NodeBody = {
  [x: string]: unknown;
};

interface EdgeType {
  id: string;
  name: string;
  color: string;
}

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
  name: string;
  default_image: string;
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
  node_id?: string;
  name: string[];
  node_icon: string[];
  project_type_property_id?: string;
  project_type_property_type?: string;
  nodes_data?: NodeDataTypes;
  nodeTypeProperty: {
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
  default_image: string;
  name: string;
  updated_at: string;
  properties?: NodePropertiesValues[];
};

export type NodeDataListResponse = {
  count: number;
  rows: NodeDataResponse[];
};

// export type AllDataNodeResponse = {
//   default_image: boolean;
//   default_property: boolean;
//   node_name: NodeDataType;
//   property_name: PropertyName;
//   type_color: string;
//   type_id: string;
//   type_name: string;
//   updated_at: string;
// };

export type AllDataResponse = {
  id: string;
  default_image: string;
  name: string;
  nodeType: EdgeType;
  project_id: string;
  project_type_id: string;
  updated_at: string;
  // properties?: AllDataNodeResponse[];
};

export type AllDataListResponse = {
  count: number;
  rows: AllDataResponse[];
};

export type ConnectionSourcesSearchResult = {
  id: string;
  default_image: string;
  name: string;
  project_type_id: string;
};

export type ConnectionSourcesSearchResponse = {
  count: number;
  rows: ConnectionSourcesSearchResult[];
};
