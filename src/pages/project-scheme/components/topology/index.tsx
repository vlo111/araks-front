import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSchema } from '../../../../components/layouts/components/schema/wrapper';
import { GET_TYPES, useGetTypes } from '../../../../api/schema/type/use-get-types';
import { createNodesTree } from '../../../../components/layouts/components/data-sheet/utils';
import { initNodes } from '../../../../components/layouts/components/schema/container/initial/nodes';
import { formattedTypes } from '../../../../components/layouts/components/schema/helpers/utils';
import { Skeleton, Tree } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import { COLORS } from '../../../../helpers/constants';
import { EventDataNode } from 'antd/es/tree';
import { TreeNodeType } from '../../../data-sheet/types';
import { SecondaryText } from '../../../../components/typography';
import { Node } from '@antv/x6';
import { selectNode } from '../../../../components/layouts/components/schema/container/initial/events';
import { LINE_HEIGHT } from '../../../../components/layouts/components/schema/container/register/node';

const TopologyPanelStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: fixed;
  left: 0;
  top: 152px;
  width: 250px;
  height: 100%;
  z-index: 2;
  background-color: rgb(247, 247, 247);
  box-shadow: rgba(111, 111, 111, 0.1) -10px 10px 10px inset;
`;

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

const NodeHeader = styled(SecondaryText)`
  margin-top: 20px;
  margin-left: 32px;
`;

export const Topology: React.FC = () => {
  const { id } = useParams();
  const { graph, ...params } = useSchema() ?? {};

  const { nodes, isInitialLoading } = useGetTypes(
    {
      url: GET_TYPES,
      projectId: id ?? '',
    },
    {
      enabled: !!id,
      onSuccess: ({ data: { projectsNodeTypes } }) => {
        params.setNodesTree(createNodesTree(projectsNodeTypes));

        initNodes(graph, formattedTypes(graph, projectsNodeTypes), params);
      },
    }
  );

  const onSelect = (selectedKeys: string[], e: { selected: boolean; node: EventDataNode<TreeNodeType> }) => {
    if (e.node.id !== (params?.selectedNode as Node<Node.Properties>)?.id) {
      const container: Element = Array.from(graph.view.stage.childNodes)
        .filter((n) => (n as Element).tagName === 'g')
        .find(
          (n) =>
            (n as ChildNode & { getAttribute: (item: string) => string }).getAttribute('data-cell-id') === e.node.id
        ) as Element;

      const node = graph.getNodes().find((n) => n.id === e.node.id) as Node<Node.Properties>;

      selectNode(graph, container, node);

      params.setSelectedNode(node);

      /** calculate height of type before fit on center */
      graph.zoom(0.5, {
        minScale: 2,
        maxScale: 2,
      });

      const propertiesHeight = node.ports.items.length * LINE_HEIGHT * 2;

      const height = (propertiesHeight + node.getSize().height) / 2;

      graph.options.height = graph.options.height - height;

      graph.centerCell(node);

      /** reset graph height after fit on center */
      graph.options.height = graph.options.height + height;
    }
  };

  return (
    <TopologyPanelStyle>
      <NodeHeader>Schema vault</NodeHeader>
      {isInitialLoading ? (
        <Skeleton />
      ) : (
        <StyledTree
          onSelect={onSelect}
          switcherIcon={<CaretDownFilled style={{ color: COLORS.PRIMARY.GRAY, fontSize: 16 }} />}
          selectedKeys={[(params.selectedNode as Node<Node.Properties>)?.id]}
          treeData={createNodesTree(nodes)}
          autoExpandParent
          blockNode
          defaultExpandAll
          color={(params.selectedNode as Node<Node.Properties>)?.attr('body/stroke')}
        />
      )}
    </TopologyPanelStyle>
  );
};
