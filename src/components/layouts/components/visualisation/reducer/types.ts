import { Graph } from '@antv/g6';
import { GraphAction } from './graph-manager';
import { IProjectType } from 'api/types';
import { ProjectEdgeResponse } from 'types/project-edge';

export interface IIsOpen {
  isOpened?: boolean;
}

export interface IOpenNodeState extends IIsOpen {
  id: string;
}

export interface IOpenNodeCreate extends IIsOpen {
  x?: number;
  y?: number;
}

export type GraphState = {
  graph?: Graph;
  nodes?: IProjectType;
  edges?: ProjectEdgeResponse[];
  openNode?: IOpenNodeState;
  openNodeCreate?: IIsOpen;
};

export interface GraphActionType {
  type: GraphAction;
  payload: GraphState;
}
