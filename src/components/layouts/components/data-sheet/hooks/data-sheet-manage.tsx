import { TreeStructure, TreeStructureLabel } from "types/project";

export enum DataSheetActionKind {
  ADD_TYPE_START = 'ADD_TYPE_START',
  ADD_TYPE_FINISH = 'ADD_TYPE_FINISH',
  TYPE_SELECTED = 'TYPE_SELECTED',
  EDIT_TYPE_START = 'EDIT_TYPE_START',
  EDIT_TYPE_FINISH = 'EDIT_TYPE_FINISH',
}

export type DataSheetState = {
  addTypeisOpened?: boolean,
  editTypeisOpened?: boolean,
  color?: string,
  nodesList?: TreeStructure[],
  nodesListLabel?: TreeStructureLabel[],
  titleText?: string;
  projectId?: string;
};

interface DataSheetAction {
  type: DataSheetActionKind;
  payload: DataSheetState;
}

export const dataSheetInitialState: DataSheetState = {
  color: '#232F6A',
  titleText: '',
  addTypeisOpened: false,
  editTypeisOpened: false,
}

export function dataSheetReducer(state: DataSheetState, action: DataSheetAction) {
  const { type, payload } = action;
  console.log('first',payload, type)
  switch (type) {
    case DataSheetActionKind.ADD_TYPE_START:
      return {
        ...state,
        titleText: 'New Type',
        color: '#DDDDDD',
        addTypeisOpened: true,
      };
    case DataSheetActionKind.ADD_TYPE_FINISH:
      return {
        ...state,
        titleText: dataSheetInitialState.titleText,
        color: dataSheetInitialState.color,
        addTypeisOpened: false,
      };
    case DataSheetActionKind.TYPE_SELECTED:
      return {
        ...state,
        color: '#DDDDDD',
        ...payload,
      };
    case DataSheetActionKind.EDIT_TYPE_START:
      return {
        ...state,
        editTypeisOpened: true,
      };
    case DataSheetActionKind.EDIT_TYPE_FINISH:
      return {
        ...state,
        editTypeisOpened: false,
      };
    default:
      return state;
  }
}
