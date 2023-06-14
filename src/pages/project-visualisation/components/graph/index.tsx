import React from 'react';
import styled from 'styled-components';
import { useGraphRef } from 'hooks/use-graph';

const Wrapper = styled.div`
  position: fixed;
  left: 300px;
  top: 152px;
  z-index: 0;
`;

export const Graph: React.FC = () => <Wrapper ref={useGraphRef()} />;
