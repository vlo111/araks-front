import { DefaultOptionType } from 'antd/es/cascader';
import { ProjectTreeReturnData } from 'api/types';

export type PropsSetState = {
  visible: boolean;
  searchVisible?: boolean;
  setVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setSearchVisible: (value: boolean | ((prevVar: boolean) => boolean)) => void;
};

export type TreeNodeType = ProjectTreeReturnData & DefaultOptionType;

export type DataSheetState = {
  addTypeisOpened?: boolean;
  editTypeisOpened?: boolean;
  color?: string;
  nodesList?: TreeNodeType[];
  filteredNodeTypes?: TreeNodeType[];
  titleText?: string;
  prevState?: PrevDataSheetState;
  nodeTypeId?: string;
  parentId?: string;
  selectNodeTypeFinished?: boolean; //Runs onece , on page load
  searchText?: string;
};

export type PrevDataSheetState = Pick<DataSheetState, 'color' | 'titleText' | 'nodeTypeId' | 'parentId'>;
