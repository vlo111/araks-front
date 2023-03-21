import { createContext, useContext, useReducer } from "react";

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
    addTypeisOpened?: boolean,
    editTypeisOpened?: boolean,
    titleText?: string;
    nodeTypeId?: string;
};

interface TypePropertyAction {
    type: TypePropertyActionKind;
    payload: TypePropertyState;
}

type TypePropertyProviderProps = {children: React.ReactNode}

type TypePropertyDispatch = (action: TypePropertyAction) => void


const TypePropertyContext = createContext<
  {state: TypePropertyState; dispatch: TypePropertyDispatch} | undefined
>(undefined)


export function typePropertyReducer(state: TypePropertyState, action: TypePropertyAction) {
    const { type, payload } = action;
    console.log('type->', type);
    console.log('payload->', payload);
    switch (type) {
      case TypePropertyActionKind.ADD_TYPE_START:
        return {
          ...state,
          titleText: 'New Property ()',
          addTypeisOpened: true,
        };
      case TypePropertyActionKind.ADD_TYPE_FINISH:
        return {
          ...state,
          // titleText: typePropertyInitialState.titleText,
          // color: typePropertyInitialState.color,
          addTypeisOpened: false,
        };
      case TypePropertyActionKind.ADD_TYPE_CANCEL:
        return {
          ...state,
          ...payload,
          addTypeisOpened: false,
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
          editTypeisOpened: true,
        };
      case TypePropertyActionKind.EDIT_TYPE_FINISH:
        return {
          ...state,
          editTypeisOpened: false,
        };
      case TypePropertyActionKind.DELETE_TYPE:
        return {
          ...state,
          editTypeisOpened: false,
          nodeTypeId: undefined,
        };
      default:
        return state;
    }
}
  
export const initialState: TypePropertyState = {
    titleText: '',
    addTypeisOpened: false,
    editTypeisOpened: false,
}

function TypePropertyProvider({children}: TypePropertyProviderProps) {
    const [state, dispatch] = useReducer(typePropertyReducer, initialState)
 
    const value = {state, dispatch}
    return (
      <TypePropertyContext.Provider value={value}>
        {children}
      </TypePropertyContext.Provider>
    )
}

function useTypeProperty() {
    const context = useContext(TypePropertyContext)
    if (context === undefined) {
      throw new Error('useTypeProperty must be used within a TypePropertyProvider')
    }
    return context
}
  
export {TypePropertyProvider, useTypeProperty}