import { Edge, Graph } from '@antv/g6';
import { GraphAction } from './graph-manager';
import { IProjectType } from 'api/types';
import { ProjectEdgeResponse } from 'types/project-edge';

export interface IIsOpen {
  isOpened?: boolean;
}

export interface IOpenIdState extends IIsOpen {
  id: string;
}

export interface IOpenEdgeState extends IIsOpen {
  edge: Edge;
}

export interface IOpenNodeCreate extends IIsOpen {
  x?: number;
  y?: number;
}

export type GraphState = {
  graph?: Graph;
  nodes?: IProjectType;
  edges?: ProjectEdgeResponse[];
  openNode?: IOpenIdState;
  openEdge?: IOpenEdgeState;
  openNodeCreate?: IIsOpen;
  deleteNode?: IIsOpen;
};

export interface GraphActionType {
  type: GraphAction;
  payload: GraphState;
}
