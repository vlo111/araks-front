import { DefaultOptionType } from 'antd/es/cascader';
import { NodeEdgeTypesReturnData, ProjectTreeReturnData } from 'api/types';

export type PropsSetState = {
  searchVisible?: boolean;
  setSearchVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
};

export type TreeNodeType = ProjectTreeReturnData & DefaultOptionType;
export type TreeConnectionType = NodeEdgeTypesReturnData & DefaultOptionType;

export type DataSheetState = {
  addTypeisOpened?: boolean;
  editTypeisOpened?: boolean;
  color?: string;
  nodesList?: TreeNodeType[];
  dataList?: ProjectTreeReturnData[];
  filteredNodeTypes?: TreeNodeType[];
  titleText?: string;
  prevState?: PrevDataSheetState;
  nodeTypeId?: string;
  parentId?: string;
  selectNodeTypeFinished?: boolean; //Runs onece , on page load
  searchText?: string;
  isConnectionType?: boolean;
};

export type PrevDataSheetState = Pick<DataSheetState, 'color' | 'titleText' | 'nodeTypeId' | 'parentId'>;
