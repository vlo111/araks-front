import { GraphActionType, GraphState } from './types';

const initState = {
  isOpened: false,
};

export enum ITEM {
  GRAPH = 'graph',
  OPEN_NODE = 'openNode',
  OPEN_EDGE = 'openEdge',
  DELETE_NODE = 'deleteNode',
  DELETE_EDGE = 'deleteEdge',
  OPEN_CREATE_NODE = 'openNodeCreate',
  OPEN_CREATE_EDGE = 'openEdgeCreate',
}

export enum GraphAction {
  SET_GRAPH = 'SET_GRAPH',
  OPEN_NODE_START = 'OPEN_NODE_START',
  OPEN_NODE_FINISH = 'OPEN_NODE_FINISH',
  OPEN_CREATE_NODE_START = 'OPEN_CREATE_NODE_START',
  OPEN_CREATE_NODE_FINISH = 'OPEN_CREATE_NODE_FINISH',
  DELETE_NODE_START = 'DELETE_NODE_START',
  DELETE_NODE_FINISH = 'DELETE_NODE_FINISH',
  OPEN_EDGE_START = 'OPEN_EDGE_START',
  OPEN_EDGE_FINISH = 'OPEN_EDGE_FINISH',
  DELETE_EDGE_START = 'DELETE_EDGE_START',
  DELETE_EDGE_FINISH = 'DELETE_EDGE_FINISH',
  OPEN_CREATE_EDGE_START = 'OPEN_CREATE_EDGE_START',
  OPEN_CREATE_EDGE_FINISH = 'OPEN_CREATE_EDGE_FINISH',
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

  const start: (item: ITEM) => GraphState = (item: ITEM) => ({
    ...state,
    [item]: {
      ...state[item],
      ...payload,
      isOpened: true,
    },
  });

  const end = (item: ITEM) => ({
    ...state,
    [item]: { ...state[item], isOpened: false },
  });

  switch (type) {
    case GraphAction.SET_GRAPH:
      return insert(ITEM.GRAPH) as GraphState;
    case GraphAction.OPEN_NODE_START:
      return start(ITEM.OPEN_NODE);
    case GraphAction.OPEN_NODE_FINISH:
      return end(ITEM.OPEN_NODE);
    case GraphAction.OPEN_CREATE_NODE_START:
      return {
        ...state,
        [ITEM.OPEN_CREATE_NODE]: {
          ...state[ITEM.OPEN_CREATE_NODE],
          ...payload,
        },
      };
    case GraphAction.OPEN_CREATE_NODE_FINISH:
      return end(ITEM.OPEN_CREATE_NODE);
    case GraphAction.DELETE_NODE_START:
      return start(ITEM.DELETE_NODE);
    case GraphAction.DELETE_NODE_FINISH:
      return end(ITEM.DELETE_NODE);
    case GraphAction.OPEN_EDGE_START:
      return start(ITEM.OPEN_EDGE);
    case GraphAction.OPEN_EDGE_FINISH:
      return end(ITEM.OPEN_EDGE);
    case GraphAction.DELETE_EDGE_START:
      return start(ITEM.DELETE_EDGE);
    case GraphAction.DELETE_EDGE_FINISH:
      return end(ITEM.DELETE_EDGE);
    case GraphAction.OPEN_CREATE_EDGE_START:
      return start(ITEM.OPEN_CREATE_EDGE);
    case GraphAction.OPEN_CREATE_EDGE_FINISH:
      return end(ITEM.OPEN_CREATE_EDGE);
    default:
      return state;
  }
};
