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

function filterTreeNodes(searchText: string, treeNode: any) {
  // Return true if the node's name matches the search text
  if (treeNode.name.toLowerCase().includes(searchText.toLowerCase())) {
    return true;
  }

  // Recursively check the node's children
  if (treeNode.children) {
    return treeNode.children.some((child: any) => filterTreeNodes(searchText, child));
  }

  // If no match was found, return false
  return false;
}

export const NodeTypes = ({ visible, setVisible }: PropsSetState) => {
  const params = useParams();
  const { selectNodeType, color, nodeTypeId, selectNodeTypeFinished, searchText } = useDataSheetWrapper();

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

  const onSelect = (selectedKeys: string[], e: { selected: boolean; node: EventDataNode<TreeNodeType> }) => {
    selectNodeType({
      titleText: e.node.name,
      color: e.node.color,
      nodeTypeId: e.node.id,
      parentId: e.node.parent_id,
    });
  };

  return !selectNodeTypeFinished || isInitialLoading ? (
    <Skeleton />
  ) : (
    <>
      {/* <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChange} /> */}
      <StyledTree
        onSelect={onSelect}
        switcherIcon={<CaretDownFilled style={{ color: COLORS.PRIMARY.GRAY, fontSize: 16 }} />}
        selectedKeys={[nodeTypeId]}
        defaultExpandedKeys={[nodeTypeId]}
        treeData={nodesList}
        autoExpandParent
        blockNode
        defaultExpandAll
        style={!visible ? { display: 'none' } : {}}
        color={color}
        filterTreeNode={(node: any) => searchText && filterTreeNodes(searchText, node)}
      />
    </>
  );
};
