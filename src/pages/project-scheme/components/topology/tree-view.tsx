import React from 'react';
import styled from 'styled-components';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { selectNodeWithZoom } from 'components/layouts/components/schema/helpers/selection';
import { Tree } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import { COLORS, PATH } from "helpers/constants";
import { EventDataNode } from 'antd/es/tree';
import { TreeNodeType } from '../../../data-sheet/types';
import { Node } from '@antv/x6';
import { IProjectType } from 'api/types';

type Props = React.FC<{ nodes: IProjectType[] }>;

type OnSelect = (selectedKeys: string[], e: { selected: boolean; node: EventDataNode<TreeNodeType> }) => void;

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

export const TreeView: Props = ({ nodes }) => {
  const { graph, selectedNode, setSelectedNode } = useSchema() ?? {};

  const onSelect: OnSelect = (selectedKeys, e) => {
    selectNodeWithZoom(e.node.id, graph, selectedNode, setSelectedNode);
  };

  return (
    <StyledTree
      onSelect={onSelect}
      switcherIcon={<CaretDownFilled style={{ color: COLORS.PRIMARY.GRAY, fontSize: 16 }} />}
      selectedKeys={[(selectedNode as Node<Node.Properties>)?.id]}
      treeData={createNodesTree(nodes)}
      autoExpandParent
      blockNode
      defaultExpandAll
      color={selectedNode === undefined || typeof selectedNode === 'string' ? '' : selectedNode.attr(PATH.NODE_COLOR)}
    />
  );
};
