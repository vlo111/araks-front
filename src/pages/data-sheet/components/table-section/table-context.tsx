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
        actionColWidth: '200px',
      };
    case TypePropertyActionKind.ADD_TYPE_FINISH:
      return {
        ...state,
        addTypeisOpened: false,
        actionColWidth: undefined,
        titleText: undefined,
      };
    case TypePropertyActionKind.ADD_TYPE_CANCEL:
      return {
        ...state,
        ...payload,
        addTypeisOpened: false,
        actionColWidth: undefined,
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
      };
    case TypePropertyActionKind.MANAGE_TYPE_START:
      return {
        ...state,
        propertyId: payload.propertyId,
        manageTypeisOpened: true,
      };
    case TypePropertyActionKind.MANAGE_TYPE_FINISH:
      return {
        ...state,
        propertyId: undefined,
        manageTypeisOpened: false,
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
    default:
      return state;
  }
}

export const initialState: TypePropertyState = {
  titleText: '',
  addTypeisOpened: false,
  editTypeisOpened: false,
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
