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

export const NodeTypes = ({ visible, setVisible }: PropsSetState) => {
  const params = useParams();
  const { selectNodeType, color, nodeTypeId, selectNodeTypeFinished } = useDataSheetWrapper();
  // eslint-disable-next-line no-console
  console.log('first', selectNodeType);

  const { formatted: nodesList, isLoading } = useGetProjectNoteTypes(
    {
      url: GET_PROJECT_NODE_TYPES_LIST,
      projectId: params.id || '',
    },
    {
      enabled: !!(params.id && selectNodeType),
      onSuccess: (data) => {
        /** This condition sets selected fisr node type when first time enter to this page */
        const nodesList = createNodesTree(data.data);
        // eslint-disable-next-line no-console
        console.log(data.data.length && !nodeTypeId, nodesList);
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
        selectNodeType({
          selectNodeTypeFinished: true,
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
  return !selectNodeTypeFinished || isLoading ? (
    <Skeleton />
  ) : (
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
    />
  );
};
