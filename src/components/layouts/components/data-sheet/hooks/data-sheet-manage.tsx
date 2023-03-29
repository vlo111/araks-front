import { DataSheetState, TreeNodeType } from 'pages/data-sheet/types';

export enum DataSheetActionKind {
  ADD_TYPE_START = 'ADD_TYPE_START',
  ADD_TYPE_FINISH = 'ADD_TYPE_FINISH',
  ADD_TYPE_CANCEL = 'ADD_TYPE_CANCEL',
  TYPE_SELECTED = 'TYPE_SELECTED',
  TYPE_SEARCH = 'TYPE_SEARCH',
  TYPE_SEARCH_CLEAR = 'TYPE_SEARCH_CLEAR',
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
  searchText: '',
  addTypeisOpened: false,
  editTypeisOpened: false,
  selectNodeTypeFinished: false,
  filteredNodeTypes: [] as TreeNodeType[],
};

export function dataSheetReducer(state: DataSheetState, action: DataSheetAction) {
  const { type, payload } = action;
  switch (type) {
    case DataSheetActionKind.ADD_TYPE_START:
      return {
        ...state,
        prevState: {
          color: state.color,
          titleText: state.titleText,
          nodeTypeId: state.nodeTypeId,
          parentId: state.parentId,
        },
        titleText: 'New Type',
        color: '#DDDDDD',
        addTypeisOpened: true,
      };
    case DataSheetActionKind.ADD_TYPE_FINISH:
      return {
        ...state,
        addTypeisOpened: false,
      };
    case DataSheetActionKind.ADD_TYPE_CANCEL:
      return {
        ...state,
        ...payload,
        color: state.prevState?.color,
        titleText: state.prevState?.titleText,
        nodeTypeId: state.prevState?.nodeTypeId,
        parentId: state.prevState?.parentId,
        prevState: {},
        addTypeisOpened: false,
      };
    case DataSheetActionKind.TYPE_SELECTED:
      return {
        ...state,
        // color: '#DDDDDD',
        addTypeisOpened: false,
        ...payload,
      };
    case DataSheetActionKind.TYPE_SEARCH:
      return {
        ...state,
        searchText: payload.searchText,
        filteredNodeTypes:
          payload.searchText?.length && state.nodesList
            ? state.nodesList?.filter((item) => item.name.includes(payload.searchText || ''))
            : ([] as TreeNodeType[]),
      };
    case DataSheetActionKind.TYPE_SEARCH_CLEAR:
      return {
        ...state,
        searchText: dataSheetInitialState.searchText,
        filteredNodeTypes: dataSheetInitialState.filteredNodeTypes,
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
