import React from 'react';
import styled from 'styled-components';

const TopologyPanelStyle = styled.div`
  position: fixed;
  left: 0;
  top: 152px; // header - 88, tab-panel - 64
  width: 250px;
  height: 100%;
  z-index: 2;
`;

export const TopologyPanel: React.FC = () => (
    <TopologyPanelStyle>Side</TopologyPanelStyle>
);
