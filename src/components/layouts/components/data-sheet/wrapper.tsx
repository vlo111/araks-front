import { FastForwardFilled } from "@ant-design/icons";
import { Col, Row as RowComponent } from "antd"
import { Share } from "pages/project-overview/share";
import { useMemo, useReducer, useState } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";

enum ProjectNodeActionTypes {
    NEW_TYPE = 'NEW_TYPE',
    CLOSE_TYPE = 'CLOSE_TYPE',
}

const initProjectNodes = {
    addTypeOpen: false,
};
  
interface ProjectNodeAction {
    type: ProjectNodeActionTypes;
    payload: number;
}

interface ProjectNodeState {
    count: number;
}



// const projectNodesReducer = (state: ProjectNodeState, action:ProjectNodeAction) => {
//     switch (action.type) {
//       case ProjectNodeActionTypes.NEW_TYPE:
//         return {
//             ...state,
//             addTypeOpen: true,
//         };
//       default:
//         return state;
//     }
// };

export type DataSheetContextType = {
    color: string,
    setAddType: (value: boolean | ((prevVar: boolean) => boolean)) => void,
    addTypeisOpened: boolean,
    hasNodeTypes: boolean,
};

export const DataSheetWrapper = () => {
    const params = useParams();
    const [addTypeisOpened, setAddType] = useState(false);

    // const [projectNodesState, dispatch] = useReducer(projectNodesReducer, initProjectNodes);


    const context = useMemo(() => ({
        color: '#232F6A',
        setAddType,
        addTypeisOpened,
        hasNodeTypes: true,
    }), [addTypeisOpened]);
    console.log('context', context);

    return <Outlet context={context} /> 
}

export function useDataSheetWrapper() {
    const context = useOutletContext<DataSheetContextType>();
    return context || {} as DataSheetContextType
}