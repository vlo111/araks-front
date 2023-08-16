import { Edge, Graph } from '@antv/g6';
import { GraphAction } from './graph-manager';
import { IProjectType } from 'api/types';
import { ProjectEdgeResponse } from 'types/project-edge';

export interface IIdOpen {
  isOpened?: boolean;
}

export interface IOpenIdState extends IIdOpen {
  id: string;
}

export interface IOpenEdgeState extends IIdOpen {
  edge: Edge;
}

export interface IOpenNodeCreate extends IIdOpen {
  x?: number;
  y?: number;
}

export type GraphState = {
  graph?: Graph;
  nodes?: IProjectType;
  edges?: ProjectEdgeResponse[];
  openNode?: IOpenIdState;
  openEdge?: IOpenEdgeState;
  openNodeCreate?: IIdOpen;
  deleteNode?: IIdOpen;
  deleteEdge?: IIdOpen;
};

export interface GraphActionType {
  type: GraphAction;
  payload: GraphState;
}
