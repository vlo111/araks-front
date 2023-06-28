import { Graph } from '@antv/g6';
import { IOpenNodeCreate, IOpenNodeState } from "./reducer/types";
import { ProjectEdgeResponse } from "types/project-edge";
import { Nodes } from "api/visualisation/use-get-nodes";

export type VisualisationReducerSetState = {
  setGraph: (graph: Graph) => void;
  setNodes: (nodes: Nodes) => void;
  setEdges: (nodes: ProjectEdgeResponse[]) => void;
  startOpenNode: (node?: IOpenNodeState) => void;
  finishOpenNode: VoidFunction;
  startOpenNodeCreate: (item?: IOpenNodeCreate) => void;
  finishOpenNodeCreate: VoidFunction;
};

export type VisualisationReducerState = {
  graph: Graph;
  nodes: Nodes;
  edges: ProjectEdgeResponse[];
  openNode: IOpenNodeState;
  openNodeCreate: IOpenNodeCreate
};

export interface VisualisationContextType extends VisualisationReducerSetState, VisualisationReducerState {}

export type PickSchemaContextType = Pick<VisualisationContextType, 'startOpenNode' | 'startOpenNodeCreate'>;

export type InitGraph = (container: HTMLDivElement, params: PickSchemaContextType) => Graph;

export type Node = {
  id: string;
  label: string;
  size: number;
  style: { lineWidth: number; fill: string; stroke: string };
};

export type Edge = { id: string | undefined; source: string; target: string; label: string };

export type GraphData = {
  nodes: Node[];
  edges: Edge[];
};

export type InitNodes = (graph: Graph, data: GraphData) => void;
