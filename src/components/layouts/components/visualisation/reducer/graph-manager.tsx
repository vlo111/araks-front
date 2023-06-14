import { GraphActionType, GraphState } from './types';

export enum ITEM {
  GRAPH = 'graph',
}

export enum GraphAction {
  SET_GRAPH = 'SET_GRAPH',
}

export const graphInitialState: GraphState = {};

export const graphReducer: (state: GraphState, action: GraphActionType) => GraphState = (state, action) => {
  const { type, payload } = action;

  const insert = (item: ITEM) => ({
    ...state,
    [item]: payload,
  });

  switch (type) {
    case GraphAction.SET_GRAPH:
      return insert(ITEM.GRAPH) as GraphState;
    default:
      return state;
  }
};
