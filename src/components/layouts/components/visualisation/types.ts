import { Graph } from '@antv/g6';
import { IProjectType } from 'api/types';
import { INodeOpen, ProjectEdgeResponse } from 'types/project-edge';

export type VisualisationReducerSetState = {
  setGraph: (graph: Graph) => void;
  setNodes: (nodes: IProjectType[]) => void;
  setEdges: (nodes: ProjectEdgeResponse[]) => void;
  startOpenNode: (node?: INodeOpen) => void;
};

export type VisualisationReducerState = {
  graph: Graph;
  nodes: IProjectType[];
  edges: ProjectEdgeResponse[];
  openNode: INodeOpen;
};

export interface VisualisationContextType extends VisualisationReducerSetState, VisualisationReducerState {}

export type PickSchemaContextType = Pick<VisualisationContextType, 'startOpenNode'>;

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
