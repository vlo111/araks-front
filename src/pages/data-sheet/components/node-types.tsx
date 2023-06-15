/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton } from 'antd';
import debounce from 'lodash.debounce';
import { EventDataNode } from 'antd/es/tree';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { PropsSetState, TableStyleBasedOnTab, TreeNodeType } from '../types';
import { GET_PROJECT_NODE_TYPES_LIST, useGetProjectNoteTypes } from 'api/project-node-types/use-get-project-note-types';
import { useParams } from 'react-router-dom';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { useCallback, useEffect, useState } from 'react';
import { SearchAction } from 'components/actions';
import { filterTreeData } from '../utils';
import { NodeTree } from 'components/tree/node-tree';
import { ReactComponent as CaretDown } from 'components/icons/caret-down.svg';
import { ReactComponent as CaretRight } from 'components/icons/caret-right.svg';

const switcherIcon = ({ isLeaf, expanded }: { isLeaf: boolean; expanded: boolean }) => {
  if (isLeaf) {
    return null;
  }
  return expanded ? <CaretDown /> : <CaretRight />;
};

type Props = PropsSetState & TableStyleBasedOnTab;

export const NodeTypes = ({ searchVisible, setSearchVisible, isCheckable = false, noColors = false }: Props) => {
  const params = useParams();
  const [filteredData, setFilteredData] = useState<TreeNodeType[]>([]);
  const { selectNodeType, color, nodeTypeId, selectNodeTypeFinished } = useDataSheetWrapper();

  const {
    formatted: nodesList,
    isInitialLoading,
    data,
  } = useGetProjectNoteTypes(
    {
      url: GET_PROJECT_NODE_TYPES_LIST,
      projectId: params.id || '',
    },
    {
      enabled: !!(params.id && selectNodeType),
      onSuccess: (data) => {
        /** This condition sets selected fisr node type when first time enter to this page */
        const nodesList = createNodesTree(data.data);
        if (data.data.length && !nodeTypeId) {
          selectNodeType?.({
            titleText: data.data[0].name,
            color: data.data[0].color,
            nodeTypeId: data.data[0].id,
            parentId: data.data[0].parent_id,
            selectNodeTypeFinished: true,
            nodesList,
            dataList: data.data,
          });
          return;
        }
        selectNodeType?.({
          selectNodeTypeFinished: true,
          nodesList,
        });
      },
    }
  );

  useEffect(() => {
    if (nodesList && nodesList.length) {
      setFilteredData(nodesList);
    } else {
      setFilteredData([]);
    }
  }, [nodesList]);

  const onSelect = (selectedKeys: string[], e: { selected: boolean; node: EventDataNode<TreeNodeType> }) => {
    selectNodeType({
      titleText: e.node.name,
      color: e.node.color,
      nodeTypeId: e.node.id,
      parentId: e.node.parent_id,
      selectNodeTypeFinished: true,
      nodesList,
      dataList: data,
    });
  };

  const onSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value.trim().toLowerCase();

      debounce(() => {
        const filteredData = filterTreeData(nodesList, searchText);
        setFilteredData(filteredData);
      }, 500)();
    },
    [nodesList]
  );

  const onClear = useCallback(() => {
    setFilteredData(nodesList);
  }, [nodesList]);

  return !selectNodeTypeFinished || isInitialLoading ? (
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
        showSearch
        checkable={isCheckable}
        switcherIcon={switcherIcon}
        selectedKeys={[nodeTypeId]}
        defaultExpandedKeys={[nodeTypeId]}
        treeData={filteredData}
        autoExpandParent
        blockNode
        defaultExpandAll
        color={color}
      />
    </>
  );
};
