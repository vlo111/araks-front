import { Graph } from '@antv/g6';
import { ProjectEdgeResponse } from 'types/project-edge';
import { IIsOpen, IOpenNodeState } from "./reducer/types";

export type VisualisationReducerSetState = {
  setGraph: (graph: Graph) => void;
  setNodes: (nodes: any) => void;
  setEdges: (nodes: ProjectEdgeResponse[]) => void;
  startOpenNode: (node?: IOpenNodeState) => void;
  finishOpenNode: VoidFunction;
  startOpenNodeCreate: (item?: IIsOpen) => void;
  finishOpenNodeCreate: VoidFunction;
};

export type VisualisationReducerState = {
  graph: Graph;
  nodes: any;
  edges: ProjectEdgeResponse[];
  openNode: IOpenNodeState;
  openNodeCreate: IIsOpen
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

export type InitNodes = (graph: Graph, data: any[] | GraphData) => void;
