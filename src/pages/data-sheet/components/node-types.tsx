/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton, Tree } from 'antd';
import { EventDataNode } from 'antd/es/tree';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import styled from 'styled-components';
import { PropsSetState, TreeNodeType } from '../types';
import { CaretDownFilled } from '@ant-design/icons';
import { COLORS } from 'helpers/constants';
import { GET_PROJECT_NODE_TYPES_LIST, useGetProjectNoteTypes } from 'api/project-node-types/use-get-project-note-types';
import { useParams } from 'react-router-dom';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { Input } from 'components/input';
import { useEffect, useRef, useState } from 'react';

const StyledTree = styled(({ color, ...props }) => <Tree {...props} />)`
  && {
    background-color: transparent;

    .ant-tree-treenode {
      padding: 0 24px;

      .ant-tree-node-content-wrapper {
        &:hover {
          background-color: transparent;
        }
      }

      &.filter-node {
        background-color: #ffaf2620;
        .ant-badge-status-text {
          color: red;
        }
      }
    }

    .ant-tree-treenode-selected {
      background-color: ${(props) => `${props.color}20`};

      .ant-tree-node-selected {
        background-color: transparent;
        .ant-badge-status-text {
          font-weight: 700;
        }
      }
    }
  }
`;

function filterTreeData(data: TreeNodeType[], searchText: string): TreeNodeType[] {
  return data
    .map((node) => {
      // Clone the node object to avoid modifying the original data
      const clonedNode = { ...node };

      if (clonedNode.name.toLowerCase().includes(searchText)) {
        // The node matches the search text, so keep it and filter its children recursively
        if (clonedNode.children) {
          clonedNode.children = filterTreeData(clonedNode.children as TreeNodeType[], searchText);
        }
        return clonedNode;
      } else if (clonedNode.children) {
        // The node does not match the search text, so filter its children recursively
        const filteredChildren = filterTreeData(clonedNode.children as TreeNodeType[], searchText);
        if (filteredChildren.length > 0) {
          clonedNode.children = filteredChildren;
          return clonedNode;
        }
      }

      // The node and its children do not match the search text, so exclude it from the filtered data
      return null;
    })
    .filter((node) => node !== null) as TreeNodeType[];
}

export const NodeTypes = ({ visible, setVisible }: PropsSetState) => {
  const params = useParams();
  const [filteredData, setFilteredData] = useState<TreeNodeType[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>();
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

  function onSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchText = event.target.value.trim().toLowerCase();

    clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      const filteredData = filterTreeData(nodesList, searchText);

      setFilteredData(filteredData);
    }, 500);
  }

  return !selectNodeTypeFinished || isInitialLoading ? (
    <Skeleton />
  ) : (
    <>
      <Input.Search placeholder="Search" onChange={onSearch} />
      <StyledTree
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
        // filterTreeNode={(node: any) => filterText && filterTreeNodes(filterText, node)}
      />
    </>
  );
};
