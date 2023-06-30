import { Graph } from "@antv/g6";
import { GraphAction } from "./graph-manager";
import { IProjectType } from "../../../../../api/types";
import { ProjectEdgeResponse } from "../../../../../types/project-edge";
import {
  IEdgePortState,
  IEdgeState,
  IPerspectiveState,
  ISelectNode,
  ITypePortState,
  ITypeState
} from "../../schema/reducer/types";

export interface IIsOpen {
  isOpened?: boolean;
}

export interface IOpenNodeState extends IIsOpen {
  id: string
}

export interface IOpenNodeCreate extends IIsOpen {
  x?: number
  y?: number
}

export type GraphState = {
  graph?: Graph;
  nodes?: IProjectType
  edges?: ProjectEdgeResponse[];
  openNode?: IOpenNodeState
  openNodeCreate?: IIsOpen
};

/*
export enum ITEM {
  GRAPH = 'graph',
  NODES = 'nodes',
  SET_EDGES = 'edges',
  OPEN_NODE = 'openNode',
}
 */
export type SchemaState = {
  nodes?: IProjectType[];
  selected?: ISelectNode;
  edges?: ProjectEdgeResponse[];
  graph?: Graph;
  edge?: IEdgeState;
  type?: ITypeState;
  type_port?: ITypePortState;
  edge_port?: IEdgePortState;
  perspective?: IPerspectiveState
};

export interface GraphActionType {
  type: GraphAction;
  payload: GraphState;
}
