import { Graph } from "@antv/g6";
import { GraphAction } from "./graph-manager";


export type GraphState = {
  graph?: Graph;
};

export interface GraphActionType {
  type: GraphAction;
  payload: GraphState;
}
