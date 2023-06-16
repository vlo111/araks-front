import { GraphActionType, GraphState } from './types';

const initState = {
  isOpened: false,
};

export enum ITEM {
  GRAPH = 'graph',
  NODES = 'nodes',
  SET_EDGES = 'edges',
  OPEN_NODE = 'openNode',
}

export enum GraphAction {
  SET_GRAPH = 'SET_GRAPH',
  SET_NODES = 'SET_NODES',
  SET_EDGES = 'SET_EDGES',
  OPEN_NODE_START = 'OPEN_NODE_START',
}

export const graphInitialState: GraphState = {
  openNode: {
    ...initState,
    id: '',
  },
};

export const graphReducer: (state: GraphState, action: GraphActionType) => GraphState = (state, action) => {
  const { type, payload } = action;

  const insert = (item: ITEM) => ({
    ...state,
    [item]: payload,
  });

  switch (type) {
    case GraphAction.SET_GRAPH:
      return insert(ITEM.GRAPH) as GraphState;
    case GraphAction.SET_NODES:
      return insert(ITEM.NODES);
    case GraphAction.SET_EDGES:
      return insert(ITEM.SET_EDGES);
    case GraphAction.OPEN_NODE_START:
      return insert(ITEM.OPEN_NODE);
    default:
      return state;
  }
};
