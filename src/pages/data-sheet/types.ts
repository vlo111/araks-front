import { DefaultOptionType } from "antd/es/cascader";
import { ProjectTreeReturnData } from "api/types";

export type PropsSetState = {
    visible: boolean;
    setVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export type TreeNodeType = ProjectTreeReturnData & DefaultOptionType;

export type DataSheetState = {
    addTypeisOpened?: boolean,
    editTypeisOpened?: boolean,
    color?: string,
    nodesList?: TreeNodeType[],
    titleText?: string;
    nodeTypeId?: string;
    parentId?: string;
  };
