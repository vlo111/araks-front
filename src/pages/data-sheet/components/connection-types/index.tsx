import { Skeleton } from 'antd';
import debounce from 'lodash.debounce';
import { EventDataNode, TreeProps } from 'antd/es/tree';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { PropsSetState, TableStyleBasedOnTab, TreeConnectionType } from '../../types';
import { CaretDownFilled } from '@ant-design/icons';
import { COLORS } from 'helpers/constants';
import { useParams } from 'react-router-dom';
import { createConnectionTree } from 'components/layouts/components/data-sheet/utils';
import { useCallback, useState } from 'react';
import { SearchAction } from 'components/actions';
import { NodeTree } from 'components/tree/node-tree';
import { URL_GET_NODE_EDGE_TYPES_LIST, useGetNodeEdgeTypes } from 'api/node-edge-type/use-get-node-edge-types';
import { DataSheetActionKind } from 'components/layouts/components/data-sheet/hooks/data-sheet-manage';
import { filterConnectionTreeData } from 'pages/data-sheet/utils';
import { NodeEdgeTypesReturnData } from 'api/types';

type Props = PropsSetState & TableStyleBasedOnTab;

export const ConnectionTypes = ({ searchVisible, setSearchVisible, isCheckable = false, noColors = false }: Props) => {
  const params = useParams();
  const [filteredData, setFilteredData] = useState<TreeConnectionType[]>([]);
  const { dispatch, color, selectNodeTypeFinished, nodeTypeId } = useDataSheetWrapper();

  const {
    formatted: connectionList,
    isInitialLoading,
    data: connectionData,
    isFetched,
  } = useGetNodeEdgeTypes(
    {
      url: URL_GET_NODE_EDGE_TYPES_LIST,
      projectId: params.id || '',
    },
    {
      enabled: !!params.id,
      onSuccess: (data) => {
        const connectionList = createConnectionTree(data.data);
        setFilteredData(connectionList);
      },
    }
  );

  const onSelect = (selectedKeys: string[], e: { selected: boolean; node: EventDataNode<TreeConnectionType> }) => {
    dispatch({
      type: DataSheetActionKind.CONNECTION_SELECTED,
      payload: {
        titleText: e.node.parentName,
        nodeTypeId: e.node.id,
      },
    });
  };

  const onSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value.trim().toLowerCase();

      debounce(() => {
        // setFilteredData(connectionList);
        const filteredData = filterConnectionTreeData(connectionData as NodeEdgeTypesReturnData[], searchText);
        const connectionList = createConnectionTree(filteredData as NodeEdgeTypesReturnData[]);
        setFilteredData(connectionList);
      }, 500)();
    },
    [connectionData]
  );

  const onClear = useCallback(() => {
    setFilteredData(connectionList);
  }, [connectionList]);

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    dispatch({ type: DataSheetActionKind.ALL_DATA_TYPE_CHECK, payload: { allDataTypesList: checkedKeys as string[] } });
  };

  return !selectNodeTypeFinished || isInitialLoading || !isFetched ? (
    <Skeleton />
  ) : (
    <>
      {searchVisible && (
        <SearchAction
          isSearchActive={searchVisible}
          onClear={onClear}
          onChange={onSearch}
          setSearchActive={setSearchVisible}
        />
      )}
      <NodeTree
        onSelect={onSelect}
        checkable={isCheckable}
        switcherIcon={<CaretDownFilled style={{ color: COLORS.PRIMARY.GRAY, fontSize: 16 }} />}
        treeData={filteredData}
        blockNode
        color={color}
        selectedKeys={[nodeTypeId]}
        onCheck={onCheck}
      />
    </>
  );
};
