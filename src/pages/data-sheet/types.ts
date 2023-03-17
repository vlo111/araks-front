import { ProjectTreeReturnData } from "api/types";
import { TreeStructure } from "types/project";

export type PropsSetState = {
    visible: boolean;
    setVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export type TreeNodeType = TreeStructure & ProjectTreeReturnData;
