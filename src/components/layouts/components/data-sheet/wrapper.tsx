import { useCallback, useMemo, useReducer } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { DataSheetActionKind, dataSheetInitialState, dataSheetReducer } from './hooks/data-sheet-manage';
import { DataSheetState } from 'pages/data-sheet/types';

export type DataSheetContextType = DataSheetState & {
  startAddType: () => void;
  finishAddType: () => void;
  cancelAddType: () => void;
  startEditType: () => void;
  finishEditType: () => void;
  deleteEditType: () => void;
  selectNodeType: (value: DataSheetState) => void;
  isLoading: boolean;
};

export const DataSheetWrapper = () => {
  const [state, dispatch] = useReducer(dataSheetReducer, dataSheetInitialState);

  const selectNodeType = useCallback((payload: DataSheetState) => {
    dispatch({ type: DataSheetActionKind.TYPE_SELECTED, payload });
  }, []);
  const startAddType = useCallback(() => dispatch({ type: DataSheetActionKind.ADD_TYPE_START, payload: {} }), []);
  const finishAddType = useCallback(() => dispatch({ type: DataSheetActionKind.ADD_TYPE_FINISH, payload: {} }), []);
  const startEditType = useCallback(() => dispatch({ type: DataSheetActionKind.EDIT_TYPE_START, payload: {} }), []);
  const finishEditType = useCallback(() => dispatch({ type: DataSheetActionKind.EDIT_TYPE_FINISH, payload: {} }), []);
  const deleteEditType = useCallback(() => dispatch({ type: DataSheetActionKind.DELETE_TYPE, payload: {} }), []);

  const cancelAddType = useCallback(() => {
    dispatch({ type: DataSheetActionKind.ADD_TYPE_CANCEL, payload: { titleText: dataSheetInitialState.titleText } });
  }, []);

  const context = useMemo(
    () => ({
      isLoading: false,
      startAddType,
      finishAddType,
      cancelAddType,
      startEditType,
      finishEditType,
      deleteEditType,
      // nodesList,
      selectNodeType,
      ...state,
    }),
    [
      // isLoading,
      finishAddType,
      finishEditType,
      cancelAddType,
      // nodesList,
      selectNodeType,
      startAddType,
      startEditType,
      deleteEditType,
      state,
    ]
  );

  return <Outlet context={context} />;
};

export function useDataSheetWrapper() {
  const context = useOutletContext<DataSheetContextType>();
  return context || ({} as DataSheetContextType);
}
