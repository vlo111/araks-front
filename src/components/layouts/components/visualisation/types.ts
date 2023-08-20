import { Graph } from '@antv/g6';
import { IOpenNodeCreate, IOpenIdState, IOpenEdgeState } from './reducer/types';
import { Edges, Nodes } from 'api/visualisation/use-get-data';

export type VisualisationReducerSetState = {
  setGraph: (graph: Graph) => void;
  setNodes: (nodes: Nodes) => void;
  setEdges: (nodes: Edges) => void;
  startOpenNode: (node?: IOpenIdState) => void;
  finishOpenNode: VoidFunction;
  startOpenNodeCreate: (item?: IOpenNodeCreate) => void;
  finishOpenNodeCreate: VoidFunction;
  startDeleteNode: (item?: IOpenIdState) => void;
  finishDeleteNode: VoidFunction;
  startDeleteEdge: (item?: IOpenIdState) => void;
  finishDeleteEdge: VoidFunction;
  startOpenEdge: (item?: IOpenIdState) => void;
  finishOpenEdge: VoidFunction;
  startOpenEdgeCreate: (edge?: IOpenEdgeState) => void;
  finishOpenEdgeCreate: VoidFunction;
};

export type VisualisationReducerState = {
  graph: Graph;
  nodes: Nodes;
  edges: Edges;
  openNode: IOpenIdState;
  openEdge: IOpenIdState;
  deleteNode: IOpenIdState;
  deleteEdge: IOpenIdState;
  openNodeCreate: IOpenNodeCreate;
  openEdgeCreate: IOpenEdgeState;
};

export interface VisualisationContextType extends VisualisationReducerSetState, VisualisationReducerState {}

export type PickVisualizationContextType = Pick<
  VisualisationContextType,
  | 'startOpenNode'
  | 'startOpenNodeCreate'
  | 'startDeleteNode'
  | 'startOpenEdge'
  | 'startDeleteEdge'
  | 'startOpenEdgeCreate'
>;

export type InitGraph = (container: HTMLDivElement, params: PickVisualizationContextType) => Graph;

export type Node = {
  id: string;
  label: string;
  style: { stroke: string };
};

export type Edge = { id: string | undefined; source: string; target: string; label: string };

export type GraphData = {
  nodes: Node[];
  edges: Edge[];
};

export type InitNodes = (graph: Graph, data: GraphData) => void;

export type InitGraphEvents = (graph: Graph, params: PickVisualizationContextType) => void;
