export interface IIsOpen {
  isOpened?: boolean;
}

export interface IEdgeStata extends IIsOpen {
  id?: string;
  source?: string;
  target?: string;
}

export type SchemaState = {
  edge?: IEdgeStata;
};

interface DataSheetAction {
  type: SchemaAction;
  payload: SchemaState;
}

export enum SchemaAction {
  ADD_EDGE_START = 'ADD_EDGE_START',
  ADD_EDGE_FINISH = 'ADD_EDGE_FINISH',
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
    default:
      return state;
  }
}
