import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { GET_TYPES, useGetTypes } from 'api/schema/type/use-get-types';
import { initNodes } from 'components/layouts/components/schema/container/initial/nodes';
import { formattedTypes } from 'components/layouts/components/schema/helpers/utils';
import { Skeleton } from 'antd';
import { SecondaryText } from '../../../../components/typography';
import { TreeView } from './tree-view';
import client from 'api/client';

const TopologyPanelStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: fixed;
  left: 0;
  top: 152px;
  width: 300px;
  height: 100%;
  z-index: 2;
  background-color: rgb(247, 247, 247);
  box-shadow: rgba(111, 111, 111, 0.1) -10px 10px 10px inset;
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
      onSuccess: async ({ data: { projectsNodeTypes } }) => {
        /** Get edges for format and render with types  */
        const { data: edges } = await client.get(`${process.env.REACT_APP_BASE_URL}node-edge-type/${id}`);

        params.setEdges(edges);
        params.setNodes(projectsNodeTypes);

        initNodes(graph, formattedTypes(graph, projectsNodeTypes, edges), params);
      },
    }
  );

  return (
    <TopologyPanelStyle>
      <NodeHeader>Schema vault</NodeHeader>
      {isInitialLoading ? <Skeleton /> : <TreeView nodes={nodes} />}
    </TopologyPanelStyle>
  );
};
