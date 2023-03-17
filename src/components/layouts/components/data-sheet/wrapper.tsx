import { useCallback, useMemo, useReducer } from "react";
import useGetProjectNoteTypes, { GET_PROJECT_NODE_TYPES_LIST } from "api/project-node-types/use-get-project-note-types";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { TreeStructure, TreeStructureLabel } from "types/project";
import { DataSheetActionKind, dataSheetInitialState, dataSheetReducer, DataSheetState } from "./hooks/data-sheet-manage";

export type DataSheetContextType = DataSheetState & {
    nodesList?: TreeStructure[],
    nodesListLabel?: TreeStructureLabel[],
    startAddType: () => void,
    finishAddType: () => void,
    startEditType: () => void,
    finishEditType: () => void,
    selectNodeType: (value: DataSheetState) => void,
};

export const DataSheetWrapper = () => {
    const params = useParams();
    const [state, dispatch] = useReducer(dataSheetReducer, dataSheetInitialState);

    const { formatted: nodesList, formattedSelect: nodesListLabel } = useGetProjectNoteTypes({
        url: GET_PROJECT_NODE_TYPES_LIST,
        projectId: params.id || ''
    }, { 
        enabled: !!params.id,
     });

     const selectNodeType = useCallback((payload: DataSheetState) => dispatch({ type: DataSheetActionKind.TYPE_SELECTED, payload }), []);
     const startAddType = useCallback(() => dispatch({ type: DataSheetActionKind.ADD_TYPE_START, payload: {} }), []);
     const finishAddType = useCallback(() => dispatch({ type: DataSheetActionKind.ADD_TYPE_FINISH, payload: {} }), []);
     const startEditType = useCallback(() => dispatch({ type: DataSheetActionKind.EDIT_TYPE_START, payload: {} }), []);
     const finishEditType = useCallback(() => dispatch({ type: DataSheetActionKind.EDIT_TYPE_FINISH, payload: {} }), []);

    const context = useMemo(() => ({
        startAddType,
        finishAddType,
        startEditType,
        finishEditType,
        nodesList,
        nodesListLabel,
        selectNodeType,
        ...state,
    }), [finishAddType, nodesList, nodesListLabel, selectNodeType, startAddType, state]);

    return <Outlet context={context} /> 
}

export function useDataSheetWrapper() {
    const context = useOutletContext<DataSheetContextType>();
    return context || {} as DataSheetContextType
}