import { useMemo, useState } from "react";
import useGetProjectNoteTypes, { GET_PROJECT_NODE_TYPES_LIST } from "api/project-node-types/use-get-project-note-types";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { TreeStructure, TreeStructureLabel } from "types/project";

export type DataSheetContextType = {
    color: string,
    setAddType: (value: boolean | ((prevVar: boolean) => boolean)) => void,
    setColor: (value: string | undefined | ((prevVar: string) => string)) => void,
    addTypeisOpened: boolean,
    hasNodeTypes: boolean,
    nodesList?: TreeStructure[],
    nodesListLabel?: TreeStructureLabel[],
};

export const DataSheetWrapper = () => {
    const params = useParams();
    const [addTypeisOpened, setAddType] = useState(false);
    const [color, setColor] = useState('#232F6A');

    const { formatted: nodesList, formattedSelect: nodesListLabel } = useGetProjectNoteTypes({
        url: GET_PROJECT_NODE_TYPES_LIST,
        projectId: params.id || ''
    }, { 
        enabled: !!params.id,
     });

    const context = useMemo(() => ({
        color: color,
        setAddType,
        addTypeisOpened,
        hasNodeTypes: !nodesList,
        nodesList,
        nodesListLabel,
        setColor,
    }), [addTypeisOpened, color, nodesList, nodesListLabel]);

    return <Outlet context={context} /> 
}

export function useDataSheetWrapper() {
    const context = useOutletContext<DataSheetContextType>();
    return context || {} as DataSheetContextType
}