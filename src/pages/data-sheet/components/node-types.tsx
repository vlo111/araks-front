/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton } from 'antd';
import debounce from 'lodash.debounce';
import { EventDataNode } from 'antd/es/tree';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { PropsSetState, TreeNodeType } from '../types';
import { CaretDownFilled } from '@ant-design/icons';
import { COLORS } from 'helpers/constants';
import { GET_PROJECT_NODE_TYPES_LIST, useGetProjectNoteTypes } from 'api/project-node-types/use-get-project-note-types';
import { useParams } from 'react-router-dom';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { useCallback, useEffect, useState } from 'react';
import { SearchAction } from 'components/actions';
import { filterTreeData } from '../utils';
import { NodeTree } from 'components/tree/node-tree';

export const NodeTypes = ({ visible, searchVisible, setSearchVisible }: PropsSetState) => {
  const params = useParams();
  const [filteredData, setFilteredData] = useState<TreeNodeType[]>([]);
  const { selectNodeType, color, nodeTypeId, selectNodeTypeFinished } = useDataSheetWrapper();

  const { formatted: nodesList, isInitialLoading } = useGetProjectNoteTypes(
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
    }
  }, [nodesList]);

  const onSelect = (selectedKeys: string[], e: { selected: boolean; node: EventDataNode<TreeNodeType> }) => {
    selectNodeType({
      titleText: e.node.name,
      color: e.node.color,
      nodeTypeId: e.node.id,
      parentId: e.node.parent_id,
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
        switcherIcon={<CaretDownFilled style={{ color: COLORS.PRIMARY.GRAY, fontSize: 16 }} />}
        selectedKeys={[nodeTypeId]}
        defaultExpandedKeys={[nodeTypeId]}
        treeData={filteredData}
        autoExpandParent
        blockNode
        defaultExpandAll
        style={!visible ? { display: 'none' } : {}}
        color={color}
      />
    </>
  );
};
