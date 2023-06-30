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

export type ETypeEdgeData = {
  project_edge_type_id: string;
  source_id: string;
  source: EEdgeType;
  target: EEdgeType;
};

export type ETypeEdgeDataResponse = {
  rows: ETypeEdgeData[];
  count: number;
};
