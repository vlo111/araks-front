import React from 'react';
import styled from 'styled-components';
import { Skeleton } from 'antd';
import { SecondaryText } from '../../../../components/typography';
import { TreeView } from './tree-view';
import { useNodes } from '../../../../hooks/use-nodes';

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
  const { nodes, isInitialLoading } = useNodes();

  return (
    <TopologyPanelStyle>
      <NodeHeader>Schema vault</NodeHeader>
      {isInitialLoading ? <Skeleton /> : <TreeView nodes={nodes} />}
    </TopologyPanelStyle>
  );
};
