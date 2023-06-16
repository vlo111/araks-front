import { Graph } from "@antv/g6";
import { GraphAction } from "./graph-manager";

export interface IIsOpen {
  isOpened?: boolean;
}

export interface IOpenNodeState extends IIsOpen {
  id: string
}

export type GraphState = {
  graph?: Graph;
  openNode?: IOpenNodeState
};

export interface GraphActionType {
  type: GraphAction;
  payload: GraphState;
}
