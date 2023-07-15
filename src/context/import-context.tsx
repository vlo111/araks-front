import { createContext, Dispatch, ReactNode, useContext, useMemo, useReducer } from 'react';

enum ImportActionType {
  IMPORT_OPEN = 'IMPORT_OPEN',
  IMPORT_CLOSE = 'IMPORT_CLOSE',
}

type ImportState = {
  importOpen?: boolean;
};
type ImportAction = {
  type: ImportActionType;
  payload: ImportState;
};

type DispatchAction = Dispatch<ImportAction>;
type ViewProviderProps = { children: ReactNode };

const ImportContext = createContext<{ state: ImportState; dispatch: DispatchAction } | undefined>(undefined);

const importInitialState = {
  importOpen: false,
};

const importReducer = (state: ImportState, action: ImportAction) => {
  const { type, payload } = action;
  switch (type) {
    case ImportActionType.IMPORT_OPEN:
      return {
        ...state,
        ...payload,
        importOpen: true,
      };
    case ImportActionType.IMPORT_CLOSE:
      return {
        ...state,
        ...payload,
        importOpen: false,
      };
    default:
      return state;
  }
};

function ImportProvider({ children }: ViewProviderProps) {
  const [state, dispatch] = useReducer(importReducer, importInitialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <ImportContext.Provider value={value}>{children}</ImportContext.Provider>;
}

function useImport() {
  const context = useContext(ImportContext);
  if (context === undefined) {
    throw new Error('useImport must be used within a ImportProvider');
  }
  return context;
}

export { ImportProvider, useImport, ImportActionType };
