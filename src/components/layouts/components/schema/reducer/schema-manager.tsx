import { DataSheetAction, SchemaState } from './types';

export enum ITEM {
  GRAPH = 'graph',
  TYPE = 'type',
  EDGE = 'edge',
  TYPE_PORT = 'type_port',
  EDGE_PORT = 'edge_port',
  NODES = 'nodes',
  SET_EDGES = 'edges',
  SELECT_NODE = 'selected',
  PERSPECTIVE = 'perspective',
}

interface Param { isConnector: boolean}

export enum SchemaAction {
  ADD_EDGE_START = 'ADD_EDGE_START',
  ADD_EDGE_FINISH = 'ADD_EDGE_FINISH',
  ADD_TYPE_START = 'ADD_TYPE_START',
  ADD_TYPE_FINISH = 'ADD_TYPE_FINISH',
  ADD_TYPE_PORT_START = 'ADD_TYPE_PORT_START',
  ADD_TYPE_PORT_FINISH = 'ADD_TYPE_PORT_FINISH',
  ADD_EDGE_PORT_START = 'ADD_EDGE_PORT_START',
  ADD_EDGE_PORT_FINISH = 'ADD_EDGE_PORT_FINISH',
  SET_GRAPH = 'SET_GRAPH',
  SET_NODES = 'SET_NODES',
  SET_EDGES = 'SET_EDGES',
  SET_SELECT_NODE = 'SET_SELECT_NODE',
  SET_PERSPECTIVE_SHARE_START = 'SET_PERSPECTIVE_SHARE_START',
  SET_PERSPECTIVE_SHARE_FINISH = 'SET_PERSPECTIVE_SHARE_FINISH',
}

const initState = {
  x: 0,
  y: 0,
  isOpened: false,
};

export const schemaInitialState: SchemaState = {
  type: { ...initState },
  edge: {
    id: '',
    source: '',
    target: '',
    isOpened: false,
    isUpdate: false,
    isConnector: false,
  },
  type_port: {
    portId: '',
    node: undefined,
    isUpdate: false,
    ...initState,
  },
  edge_port: {
    name: '',
    color: [''],
    id: '',
    ...initState,
  },
  selected: {
    selected: false,
  },
  perspective: {
    openShare: false,
    sharedUsers: []
  }
};

export function schemaReducer(state: SchemaState, action: DataSheetAction) {
  const { type, payload } = action;

  const insert = (item: ITEM) => ({
    ...state,
    [item]: payload,
  });

  const start = (item: ITEM) => ({
    ...state,
    [item]: {
      ...state[item],
      ...payload,
      isOpened: true,
    },
  });

  const end = (item: ITEM, param?: Param) => ({
    ...state,
    [item]: { ...state[item],
      ...param,
      isOpened: false
    },
  });

  switch (type) {
    case SchemaAction.ADD_EDGE_START:
      return start(ITEM.EDGE);
    case SchemaAction.ADD_EDGE_FINISH:
      return end(ITEM.EDGE, { isConnector: false });
    case SchemaAction.ADD_TYPE_START:
      if (state.graph !== undefined) state.graph.container.style.cursor = '';
      return start(ITEM.TYPE);
    case SchemaAction.ADD_TYPE_FINISH:
      return end(ITEM.TYPE);
    case SchemaAction.ADD_TYPE_PORT_START:
      return start(ITEM.TYPE_PORT);
    case SchemaAction.ADD_TYPE_PORT_FINISH:
      return end(ITEM.TYPE_PORT);
    case SchemaAction.ADD_EDGE_PORT_START:
      return start(ITEM.EDGE_PORT);
    case SchemaAction.ADD_EDGE_PORT_FINISH:
      return end(ITEM.EDGE_PORT);
    case SchemaAction.SET_GRAPH:
      return insert(ITEM.GRAPH);
    case SchemaAction.SET_NODES:
      return insert(ITEM.NODES);
    case SchemaAction.SET_EDGES:
      return insert(ITEM.SET_EDGES);
    case SchemaAction.SET_SELECT_NODE:
      return insert(ITEM.SELECT_NODE);
    case SchemaAction.SET_PERSPECTIVE_SHARE_START:
      return start(ITEM.PERSPECTIVE);
    case SchemaAction.SET_PERSPECTIVE_SHARE_FINISH:
      return end(ITEM.PERSPECTIVE);
    default:
      return state;
  }
}
