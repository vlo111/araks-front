import { Form, Skeleton } from 'antd';
import debounce from 'lodash.debounce';
import { EventDataNode } from 'antd/es/tree';
import { PropsSetState, TableStyleBasedOnTab, TreeConnectionType } from '../../types';
import { CaretDownFilled } from '@ant-design/icons';
import { COLORS } from 'helpers/constants';
import { useParams } from 'react-router-dom';
import {
  createQueriesConnectionTree,
  findConnectionChildrenProperties,
} from 'components/layouts/components/data-sheet/utils';
import { useCallback, useState } from 'react';
import { SearchAction } from 'components/actions';
import {
  GET_PUBLIC_GET_NODE_EDGE_TYPES_LIST,
  URL_GET_NODE_EDGE_TYPES_LIST,
  useGetNodeEdgeTypes,
} from 'api/node-edge-type/use-get-node-edge-types';
import { filterConnectionTreeData } from 'pages/data-sheet/utils';
import { NodeEdgeTypesReturnData } from 'api/types';
import { QueriesNodeTree } from 'components/tree/queries-node-tree';
import { useIsPublicPage } from 'hooks/use-is-public-page';

type Props = PropsSetState &
  TableStyleBasedOnTab & {
    setOpenTable: (openTable: boolean) => void;
    // add: () => void;
    // fieldsLength: number;
  };

export const ConnectionTypesQueries = ({
  searchVisible,
  setSearchVisible,
  isCheckable = false,
  noColors = false,
  setOpenTable,
}: // setOpenTable,
// add,
// fieldsLength,
Props) => {
  const isPublicPage = useIsPublicPage();
  const form = Form.useFormInstance();
  const params = useParams();
  const [filteredData, setFilteredData] = useState<TreeConnectionType[]>([]);

  const {
    formatted: connectionList,
    isInitialLoading,
    data: connectionData,
    isFetched,
  } = useGetNodeEdgeTypes(
    {
      url: isPublicPage ? GET_PUBLIC_GET_NODE_EDGE_TYPES_LIST : URL_GET_NODE_EDGE_TYPES_LIST,
      projectId: params.id || '',
    },
    {
      enabled: !!params.id,
      onSuccess: (data) => {
        const connectionList = createQueriesConnectionTree(data.data);

        setFilteredData(connectionList);
      },
    }
  );

  const onSelect = (selectedKeys: string[], e: { selected: boolean; node: EventDataNode<TreeConnectionType> }) => {
    setOpenTable(false);
    form.setFieldValue('queries', [
      ...(form.getFieldValue('queries') || []),
      findConnectionChildrenProperties(filteredData, selectedKeys[0]),
    ]);
  };

  const onSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value.trim().toLowerCase();

      debounce(() => {
        // setFilteredData(connectionList);
        const filteredData = filterConnectionTreeData(connectionData as NodeEdgeTypesReturnData[], searchText);
        const connectionList = createQueriesConnectionTree(filteredData as NodeEdgeTypesReturnData[]);
        setFilteredData(connectionList);
      }, 500)();
    },
    [connectionData]
  );

  const onClear = useCallback(() => {
    setFilteredData(connectionList);
  }, [connectionList]);

  return isInitialLoading || !isFetched ? (
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
      <QueriesNodeTree
        onSelect={onSelect}
        checkable={isCheckable}
        switcherIcon={<CaretDownFilled style={{ color: COLORS.PRIMARY.GRAY, fontSize: 16 }} />}
        treeData={filteredData}
        blockNode
        // color={color}
        // selectedKeys={[nodeTypeId]}
      />
    </>
  );
};
