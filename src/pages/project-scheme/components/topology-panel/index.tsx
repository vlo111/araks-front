import React from 'react';
import styled from 'styled-components';

const TopologyPanelStyle = styled.div`
  position: fixed;
  left: 0;
  top: 152px;
  width: 250px;
  height: 100%;
  z-index: 2;
  background-color: rgb(247, 247, 247);
  box-shadow: rgba(111, 111, 111, 0.1) -10px 10px 10px inset;
`;

export const Topology: React.FC = () => (
    <TopologyPanelStyle>Side</TopologyPanelStyle>
);
