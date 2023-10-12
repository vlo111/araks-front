import { Graph, IEdge } from '@antv/g6';
import { IOpenNodeCreate, IOpenIdState, IOpenEdgeState } from './reducer/types';
import { ContextTypeProject } from '../schema/types';
import { ICreateEdge } from 'types/node';

export type VisualisationReducerSetState = {
  setGraph: (graph: Graph) => void;
  setGraphInfo: (info: { nodeCount?: number; nodeCountAPI?: number }) => void;
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
  startShortestPath: (id?: IOpenIdState) => void;
  finishShortestPath: VoidFunction;
  finishOpenEdgeCreate: VoidFunction;
};

export type VisualisationReducerState = {
  graph: Graph;
  graphInfo: { nodeCount: number; nodeCountAPI?: number };
  openNode: IOpenIdState;
  openEdge: IOpenIdState;
  deleteNode: IOpenIdState;
  deleteEdge: IOpenIdState;
  openNodeCreate: IOpenNodeCreate;
  openShortestPath: IOpenIdState;
  openEdgeCreate: IOpenEdgeState;
};

export interface VisualisationContextType extends VisualisationReducerSetState, VisualisationReducerState {}

export type PickVisualizationContextType = Pick<
  VisualisationContextType,
  | 'setGraphInfo'
  | 'startOpenNode'
  | 'startShortestPath'
  | 'startOpenNodeCreate'
  | 'startDeleteNode'
  | 'startOpenEdge'
  | 'startDeleteEdge'
  | 'startOpenEdgeCreate'
>;

export type InitGraph = (
  container: HTMLDivElement,
  params: PickVisualizationContextType,
  projectInfo: ContextTypeProject | null
) => Graph;

export type Node = {
  id: string;
  label: string;
  style: { stroke: string };
};

export type Edge = {
  id: string | undefined;
  source: string;
  target: string;
  label: string;
  project_edge_type_id?: string;
  curvePosition?: number;
  curveOffset?: number;
};

export type GraphData = {
  nodes: Node[];
  edges: Edge[];
};

export type InitNodes = (graph: Graph, data: GraphData) => void;

export type InitGraphEvents = (graph: Graph, params: PickVisualizationContextType) => void;

export type ExpandListData = {
  data: {
    relations: ExpandList;
  };
};

export type ExpandList = {
  id: string;
  name: string;
  project_edge_type_id: string;
  count: number;
  direction: string;
}[];

export type GroupedData = {
  project_edge_type_id: string;
  name: string;
  direction: string;
  total: number;
};

export type GroupAndCountResult = {
  result: GroupedData[];
  grandTotal: number;
};

export type CalcExpandList = (
  data: ExpandList,
  visualizedConnections: IEdge[]
) => {
  result: GroupedData[];
  grandTotal: number;
};

export type UpdateEdges = (graph: Graph, nodeId: string) => void;

export type AddEdges = (graph: Graph, nodeId: string, edges: ICreateEdge[]) => void;
