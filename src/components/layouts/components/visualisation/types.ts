import { Graph } from '@antv/g6';

export type VisualisationReducerSetState = {
  setGraph: (graph: Graph) => void;
};

export type VisualisationReducerState = {
  graph: Graph;
};

export interface VisualisationContextType extends VisualisationReducerSetState, VisualisationReducerState {}

export type PickSchemaContextType = Pick<VisualisationContextType, 'setGraph'>;

export type InitGraph = (container: HTMLDivElement, params?: PickSchemaContextType) => Graph;
