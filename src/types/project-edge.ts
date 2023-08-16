import { Edge } from '@antv/x6';

interface IEdgeType {
  id: string;
  name: string;
  color: string;
}

export type ProjectEdgeResponse = {
  id?: string;
  name: string;
  target_id: string;
  target_attribute_id?: string;
  source_id: string;
  source_attribute_id?: string;
  inverse: boolean;
  multiple: boolean;
  target?: IEdgeType;
  source?: IEdgeType;
  edgeTypes?: { name: string };
} & { project_id?: string };

export type ProjectEdgeForm = {
  name: string;
  source_id: string;
  target_id: string;
  inverse: boolean;
  multiple: boolean;
};

export type IOpenId = {
  id: string;
};

export type IOpenEdge = {
  edge: Edge;
};
