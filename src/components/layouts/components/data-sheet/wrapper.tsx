import { useCallback, useMemo, useReducer } from "react";
import useGetProjectNoteTypes, { GET_PROJECT_NODE_TYPES_LIST } from "api/project-node-types/use-get-project-note-types";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { DataSheetActionKind, dataSheetInitialState, dataSheetReducer } from "./hooks/data-sheet-manage";
import { DataSheetState } from "pages/data-sheet/types";

export type DataSheetContextType = DataSheetState & {
    startAddType: () => void,
    finishAddType: () => void,
    startEditType: () => void,
    finishEditType: () => void,
    selectNodeType: (value: DataSheetState) => void,
};

export const DataSheetWrapper = () => {
    const params = useParams();
    const [state, dispatch] = useReducer(dataSheetReducer, dataSheetInitialState);

    const selectNodeType = useCallback((payload: DataSheetState) => dispatch({ type: DataSheetActionKind.TYPE_SELECTED, payload }), []);
    const startAddType = useCallback(() => dispatch({ type: DataSheetActionKind.ADD_TYPE_START, payload: {} }), []);
    const finishAddType = useCallback(() => dispatch({ type: DataSheetActionKind.ADD_TYPE_FINISH, payload: {} }), []);
    const startEditType = useCallback(() => dispatch({ type: DataSheetActionKind.EDIT_TYPE_START, payload: {} }), []);
    const finishEditType = useCallback(() => dispatch({ type: DataSheetActionKind.EDIT_TYPE_FINISH, payload: {} }), []);


    const { formatted: nodesList } = useGetProjectNoteTypes({
        url: GET_PROJECT_NODE_TYPES_LIST,
        projectId: params.id || ''
    }, { 
        enabled: !!params.id,
        onSuccess: (data) => {
            if (data.data.length) {
                selectNodeType({
                    titleText: data.data[0].name, 
                    color: data.data[0].color, 
                    projectId: data.data[0].id,
                    parentId: data.data[0].parent_id,
                });
            }
        }
     });

    const context = useMemo(() => ({
        startAddType,
        finishAddType,
        startEditType,
        finishEditType,
        nodesList,
        selectNodeType,
        ...state,
    }), [
        finishAddType, 
        finishEditType, 
        nodesList, 
        selectNodeType, 
        startAddType, 
        startEditType, 
        state
    ]);

    return <Outlet context={context} /> 
}

export function useDataSheetWrapper() {
    const context = useOutletContext<DataSheetContextType>();
    return context || {} as DataSheetContextType
}