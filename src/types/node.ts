export type NodeBody = {
  [x: string]: unknown;
};

export interface EdgeType {
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
  edges?: {
    id: string;
    project_edge_type_id: string;
    target_id: string;
    target_type_id: string;
  }[];
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

export type UploadedFileType = {
  name: string;
  url: string;
};

export type NodeDataType = ResponseLocationType | string | number | boolean | UploadedFileType;

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
    id: string;
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

export type NodeEdges = {
  edgeTypes: {
    id: string;
    name: string;
  };
  id: string;
  source_id: string;
  source_type_id: string;
  target_id: string;
  target_type_id: string;
  project_type_property_type: string;
  nodes: {
    created_at: string;
    default_image: string;
    id: string;
    name: string;
    project_type_id: string;
    updated_at: string;
    nodeType: EdgeType;
  };
};

export type NodeEdgesGrouped = {
  [x: string]: NodeEdges[];
};

export type NodeDataResponse = {
  id: string;
  default_image: string;
  name: string;
  updated_at: string;
  properties?: NodePropertiesValues[];
  edges: NodeEdges[];
  nodeType: EdgeType;
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

export type AllDataDocumentResponse = {
  color: string;
  node_id: string;
  project_id: string;
  property_id: string;
  property_name: string;
  type_id: string;
  type_name: string;
  default_image: string;
  data: {
    match_content: string;
    match_count: number;
    match_filename: string;
    page: number;
    path: string;
    user_id: string;
  }[];
};

export type AllDataDocumentListResponse = {
  count: number;
  rows: AllDataDocumentResponse[];
};

export type AllDataHelp = {
  id: string;
  name: string;
  color: string;
  description: string;
  status: string;
  user_id: string;
  size: number;
  fy: number;
  fx: number;
  created_at: string;
  updated_at: string;
  target: {
    id: string;
    name: string;
    target_id: string;
    source_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
  }[];
};
