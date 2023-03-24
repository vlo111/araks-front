import { useCallback, useMemo, useReducer } from 'react';
import { useGetProjectNoteTypes, GET_PROJECT_NODE_TYPES_LIST } from 'api/project-node-types/use-get-project-note-types';
import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { DataSheetActionKind, dataSheetInitialState, dataSheetReducer } from './hooks/data-sheet-manage';
import { DataSheetState } from 'pages/data-sheet/types';
import { PATHS } from 'helpers/constants';

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
  const params = useParams();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(dataSheetReducer, dataSheetInitialState);

  const selectNodeType = useCallback(
    (payload: DataSheetState) => {
      navigate(
        PATHS.DATA_SHEET_NODE_TYPE.replace(':id', params.id || '').replace(':node_type_id', payload.nodeTypeId || '')
      );
      dispatch({ type: DataSheetActionKind.TYPE_SELECTED, payload });
    },
    [navigate, params.id]
  );
  const startAddType = useCallback(() => dispatch({ type: DataSheetActionKind.ADD_TYPE_START, payload: {} }), []);
  const finishAddType = useCallback(() => dispatch({ type: DataSheetActionKind.ADD_TYPE_FINISH, payload: {} }), []);
  const startEditType = useCallback(() => dispatch({ type: DataSheetActionKind.EDIT_TYPE_START, payload: {} }), []);
  const finishEditType = useCallback(() => dispatch({ type: DataSheetActionKind.EDIT_TYPE_FINISH, payload: {} }), []);
  const deleteEditType = useCallback(() => dispatch({ type: DataSheetActionKind.DELETE_TYPE, payload: {} }), []);

  const {
    formatted: nodesList,
    data,
    isLoading,
  } = useGetProjectNoteTypes(
    {
      url: GET_PROJECT_NODE_TYPES_LIST,
      projectId: params.id || '',
    },
    {
      enabled: !!params.id,
      onSuccess: (data) => {
        /** This condition sets selected fisr node type when first time enter to this page */
        // eslint-disable-next-line no-console
        console.log(state);
        if (data.data.length && !state.nodeTypeId) {
          selectNodeType({
            titleText: data.data[0].name,
            color: data.data[0].color,
            nodeTypeId: data.data[0].id,
            parentId: data.data[0].parent_id,
            selectNodeTypeFinished: true,
          });
          return;
        }

        selectNodeType({
          selectNodeTypeFinished: true,
        });
      },
    }
  );

  const cancelAddType = useCallback(() => {
    if (params.node_type_id) {
      const hasSelectedNode = data?.find((item) => item.id === params.node_type_id);
      dispatch({
        type: DataSheetActionKind.ADD_TYPE_CANCEL,
        payload: { titleText: hasSelectedNode?.name, color: hasSelectedNode?.color },
      });
      return;
    }
    dispatch({ type: DataSheetActionKind.ADD_TYPE_CANCEL, payload: { titleText: dataSheetInitialState.titleText } });
  }, [data, params.node_type_id]);

  const context = useMemo(
    () => ({
      isLoading,
      startAddType,
      finishAddType,
      cancelAddType,
      startEditType,
      finishEditType,
      deleteEditType,
      nodesList,
      selectNodeType,
      ...state,
    }),
    [
      isLoading,
      finishAddType,
      finishEditType,
      cancelAddType,
      nodesList,
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
