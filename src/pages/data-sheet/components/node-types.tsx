import { Skeleton, Tree } from 'antd';
import { EventDataNode } from 'antd/es/tree';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import styled from 'styled-components';
import { PropsSetState, TreeNodeType } from '../types';
import { CaretDownFilled } from '@ant-design/icons';
import { COLORS } from 'helpers/constants';

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
  const { nodesList, selectNodeType, color, nodeTypeId, selectNodeTypeFinished } = useDataSheetWrapper();
  const onSelect = (selectedKeys: string[], e: { selected: boolean; node: EventDataNode<TreeNodeType> }) => {
    selectNodeType({
      titleText: e.node.name,
      color: e.node.color,
      nodeTypeId: e.node.id,
      parentId: e.node.parent_id,
    });
  };
  return !selectNodeTypeFinished ? (
    <Skeleton />
  ) : (
    <StyledTree
      onSelect={onSelect}
      switcherIcon={<CaretDownFilled style={{ color: COLORS.PRIMARY.GRAY, fontSize: 16 }} />}
      selectedKeys={[nodeTypeId]}
      defaultExpandedKeys={[nodeTypeId]}
      treeData={nodesList}
      blockNode
      style={!visible ? { display: 'none' } : {}}
      color={color}
    />
  );
};
