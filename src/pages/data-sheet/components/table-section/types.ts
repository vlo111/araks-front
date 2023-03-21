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
  DELETE_TYPE = 'DELETE_TYPE',
}

export type TypePropertyState = {
  addTypeisOpened?: boolean;
  editTypeisOpened?: boolean;
  titleText?: string;
  typePropertyId?: string;
  actionColWidth?: string;
  propertyId?: string;
};
