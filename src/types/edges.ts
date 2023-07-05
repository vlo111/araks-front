export interface EEdgeNodeType {
  id: string;
  name: string;
  color?: string;
}

export interface EEdgeType {
  id: string;
  name: string;
  nodeType: EEdgeNodeType;
}

export type EdgesCreateProperties = {
  edge_type_property_id: string;
  edge_type_property_type: string;
  data: string | number;
};

export type ETypeEdgeData = {
  project_edge_type_id: string;
  source_id: string;
  source: EEdgeType;
  target: EEdgeType;
  properties?: EdgesCreateProperties[];
};

export type ETypeEdgeDataResponse = {
  rows: ETypeEdgeData[];
  count: number;
};

export type EdgeSourceData = {
  source_type_id: string;
  source_id: string;
  name: string;
  id: string;
};

export type EdgeTargetData = {
  target_type_id: string;
  target_id: string;
  name: string;
  id: string;
};

export type EdgesCreate = {
  project_id: string;
  project_edge_type_id: string;
  target_type_id: string;
  target_id: string;
  source_id: string;
  source_type_id: string;
  properties: EdgesCreateProperties[];
};
