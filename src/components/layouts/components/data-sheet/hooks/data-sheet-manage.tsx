import { DataSheetState } from "pages/data-sheet/types";

export enum DataSheetActionKind {
  ADD_TYPE_START = 'ADD_TYPE_START',
  ADD_TYPE_FINISH = 'ADD_TYPE_FINISH',
  ADD_TYPE_CANCEL = 'ADD_TYPE_CANCEL',
  TYPE_SELECTED = 'TYPE_SELECTED',
  EDIT_TYPE_START = 'EDIT_TYPE_START',
  EDIT_TYPE_FINISH = 'EDIT_TYPE_FINISH',
  DELETE_TYPE = 'DELETE_TYPE',
}

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
  console.log('type->', type);
  console.log('payload->', payload);
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
        // titleText: dataSheetInitialState.titleText,
        // color: dataSheetInitialState.color,
        addTypeisOpened: false,
      };
    case DataSheetActionKind.ADD_TYPE_CANCEL:
      return {
        ...state,
        ...payload,
        addTypeisOpened: false,
      };
    case DataSheetActionKind.TYPE_SELECTED:
      return {
        ...state,
        // color: '#DDDDDD',
        addTypeisOpened: false,
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
    case DataSheetActionKind.DELETE_TYPE:
      return {
        ...state,
        editTypeisOpened: false,
        nodeTypeId: undefined,
      };
    default:
      return state;
  }
}
