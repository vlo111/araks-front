import { DataSheetAction, Item, SchemaState } from './types';

export enum SchemaAction {
  ADD_EDGE_START = 'ADD_EDGE_START',
  ADD_EDGE_FINISH = 'ADD_EDGE_FINISH',
  ADD_TYPE_START = 'ADD_TYPE_START',
  ADD_TYPE_FINISH = 'ADD_TYPE_FINISH',
  ADD_PORT_START = 'ADD_PORT_START',
  ADD_PORT_FINISH = 'ADD_PORT_FINISH',
}

export const schemaInitialState: SchemaState = {
  type: {
    isOpened: false,
  },
};

export function schemaReducer(state: SchemaState, action: DataSheetAction) {
  const { type, payload } = action;

  const start = (item: Item) => ({
    [item]: {
      ...state[item],
      ...payload,
      isOpened: true,
    },
  });

  const end = (item: Item) => ({
    [item]: {
      ...state[item],
      isOpened: false,
    },
  });

  switch (type) {
    case SchemaAction.ADD_EDGE_START:
      return start('edge');
    case SchemaAction.ADD_EDGE_FINISH:
      return end('edge');
    case SchemaAction.ADD_TYPE_START:
      // #TODO.  graph.container.style.cursor = ''
      return start('type');
    case SchemaAction.ADD_TYPE_FINISH:
      return end('type');
    case SchemaAction.ADD_PORT_START:
      return start('port');
    case SchemaAction.ADD_PORT_FINISH:
      return end('port');
    default:
      return state;
  }
}
