export interface IIsOpen {
  isOpened?: boolean;
}

export interface IEdgeState extends IIsOpen {
  id?: string;
  source?: string;
  target?: string;
}

export interface ITypeState extends IIsOpen {
  x?: number;
  y?: number;
}

export type SchemaState = {
  edge?: IEdgeState;
  type?: ITypeState;
};

interface DataSheetAction {
  type: SchemaAction;
  payload: SchemaState;
}

export enum SchemaAction {
  ADD_EDGE_START = 'ADD_EDGE_START',
  ADD_EDGE_FINISH = 'ADD_EDGE_FINISH',
  ADD_TYPE_START = 'ADD_TYPE_START',
  ADD_TYPE_FINISH = 'ADD_TYPE_FINISH',
}

export const schemaInitialState: SchemaState = {
  edge: {
    isOpened: false,
  },
};

export function schemaReducer(state: SchemaState, action: DataSheetAction) {
  const { type, payload } = action;
  switch (type) {
    case SchemaAction.ADD_EDGE_START:
      return {
        edge: {
          ...state.edge,
          ...payload,
          isOpened: true,
        },
      };
    case SchemaAction.ADD_EDGE_FINISH:
      return {
        edge: {
          ...state.edge,
          isOpened: false,
        },
      };
    case SchemaAction.ADD_TYPE_START:
      // #TODO.  graph.container.style.cursor = ''
      return {
        type: {
          ...state.type,
          ...payload,
          isOpened: true,
        },
      };
    case SchemaAction.ADD_TYPE_FINISH:
      return {
        type: {
          ...state.type,
          isOpened: false,
        },
      };
    default:
      return state;
  }
}
