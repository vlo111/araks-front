export interface DataType {
  key: React.Key;
  column: string;
}

export enum TypePropertyActionKind {
  ADD_TYPE_START = 'ADD_TYPE_START',
  ADD_TYPE_FINISH = 'ADD_TYPE_FINISH',
  ADD_TYPE_CANCEL = 'ADD_TYPE_CANCEL',
  TYPE_SELECTED = 'TYPE_SELECTED',
  EDIT_TYPE_START = 'EDIT_TYPE_START',
  EDIT_TYPE_FINISH = 'EDIT_TYPE_FINISH',
  DELETE_TYPE_START = 'DELETE_TYPE_START',
  DELETE_TYPE_FINISH = 'DELETE_TYPE_FINISH',
  MANAGE_TYPE_START = 'MANAGE_TYPE_START',
  MANAGE_TYPE_FINISH = 'MANAGE_TYPE_FINISH',
}

export type TypePropertyState = {
  addTypeisOpened?: boolean;
  editTypeisOpened?: boolean;
  deleteTypeisOpened?: boolean;
  manageTypeisOpened?: boolean;
  titleText?: string;
  typePropertyId?: string;
  propertyId?: string;
  isConnectionType?: boolean;
};
