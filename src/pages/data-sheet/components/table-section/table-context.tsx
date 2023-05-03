import { createContext, useContext, useMemo, useReducer } from 'react';
import { TypePropertyActionKind, TypePropertyState } from './types';

interface TypePropertyAction {
  type: TypePropertyActionKind;
  payload: TypePropertyState;
}

type TypePropertyProviderProps = { children: React.ReactNode };

type TypePropertyDispatch = (action: TypePropertyAction) => void;

const TypePropertyContext = createContext<{ state: TypePropertyState; dispatch: TypePropertyDispatch } | undefined>(
  undefined
);

export function typePropertyReducer(state: TypePropertyState, action: TypePropertyAction) {
  const { type, payload } = action;
  switch (type) {
    case TypePropertyActionKind.ADD_TYPE_START:
      return {
        ...state,
        titleText: 'New Property ()',
        addTypeisOpened: true,
        ...payload,
      };
    case TypePropertyActionKind.ADD_TYPE_FINISH:
      return {
        ...state,
        addTypeisOpened: false,
        titleText: undefined,
        isConnectionType: false,
      };
    case TypePropertyActionKind.ADD_TYPE_CANCEL:
      return {
        ...state,
        ...payload,
        addTypeisOpened: false,
        isConnectionType: false,
      };
    case TypePropertyActionKind.TYPE_SELECTED:
      return {
        ...state,
        // color: '#DDDDDD',
        addTypeisOpened: false,
        ...payload,
      };
    case TypePropertyActionKind.EDIT_TYPE_START:
      return {
        ...state,
        propertyId: payload.propertyId,
        editTypeisOpened: true,
        manageTypeisOpened: false,
      };
    case TypePropertyActionKind.EDIT_TYPE_FINISH:
      return {
        ...state,
        propertyId: undefined,
        editTypeisOpened: false,
        isConnectionType: false,
      };
    case TypePropertyActionKind.MANAGE_TYPE_START:
      return {
        ...state,
        propertyId: payload.propertyId,
        manageTypeisOpened: true,
        isConnectionType: false,
      };
    case TypePropertyActionKind.MANAGE_TYPE_FINISH:
      return {
        ...state,
        propertyId: undefined,
        manageTypeisOpened: false,
        isConnectionType: false,
      };
    case TypePropertyActionKind.DELETE_TYPE_START:
      return {
        ...state,
        deleteTypeisOpened: true,
        manageTypeisOpened: false,
        editTypeisOpened: false,
      };
    case TypePropertyActionKind.DELETE_TYPE_FINISH:
      return {
        ...state,
        deleteTypeisOpened: false,
        propertyId: undefined,
      };
    case TypePropertyActionKind.CREATE_CONNECTION:
      return {
        ...state,
        ...payload,
        isConnectionType: true,
      };
    /** Connection type */
    case TypePropertyActionKind.ADD_CONNECTION_TYPE_START:
      return {
        ...state,
        titleText: 'New Property ()',
        addConnectionTypeisOpened: true,
        addTypeisOpened: false,
        ...payload,
      };
    case TypePropertyActionKind.ADD_CONNECTION_TYPE_FINISH:
      return {
        ...state,
        addTypeisOpened: false,
        titleText: undefined,
        addConnectionTypeisOpened: false,
      };
    case TypePropertyActionKind.ADD_CONNECTION_TYPE_CANCEL:
      return {
        ...state,
        ...payload,
        addTypeisOpened: false,
        addConnectionTypeisOpened: false,
      };
    case TypePropertyActionKind.DELETE_CONNECTION_TYPE_START:
      return {
        ...state,
        deleteConnectionTypeisOpened: true,
        manageConnectionTypeisOpened: false,
        editConnectionTypeisOpened: false,
      };
    case TypePropertyActionKind.DELETE_CONNECTION_TYPE_FINISH:
      return {
        ...state,
        deleteConnectionTypeisOpened: false,
        propertyId: undefined,
      };
    case TypePropertyActionKind.EDIT_CONNECTION_TYPE_START:
      return {
        ...state,
        propertyId: payload.propertyId,
        editConnectionTypeisOpened: true,
        manageConnectionTypeisOpened: false,
      };
    case TypePropertyActionKind.EDIT_CONNECTION_TYPE_FINISH:
      return {
        ...state,
        propertyId: undefined,
        editConnectionTypeisOpened: false,
        // isConnectionType: false,
      };
    case TypePropertyActionKind.MANAGE_CONNECTION_TYPE_START:
      return {
        ...state,
        propertyId: payload.propertyId,
        manageConnectionTypeisOpened: true,
        // isConnectionType: false,
      };
    case TypePropertyActionKind.MANAGE_CONNECTION_TYPE_FINISH:
      return {
        ...state,
        propertyId: undefined,
        manageConnectionTypeisOpened: false,
        // isConnectionType: false,
      };
    default:
      return state;
  }
}

export const initialState: TypePropertyState = {
  titleText: '',
  addTypeisOpened: false,
  editTypeisOpened: false,
  isConnectionType: false,
  addConnectionTypeisOpened: false,
  deleteConnectionTypeisOpened: false,
  manageConnectionTypeisOpened: false,
  editConnectionTypeisOpened: false,
};

function TypePropertyProvider({ children }: TypePropertyProviderProps) {
  const [state, dispatch] = useReducer(typePropertyReducer, initialState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );
  return <TypePropertyContext.Provider value={value}>{children}</TypePropertyContext.Provider>;
}

function useTypeProperty() {
  const context = useContext(TypePropertyContext);
  if (context === undefined) {
    throw new Error('useTypeProperty must be used within a TypePropertyProvider');
  }
  return context;
}

export { TypePropertyProvider, useTypeProperty };
