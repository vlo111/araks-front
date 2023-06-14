import React from 'react';
import styled from 'styled-components';
import 'components/layouts/components/schema/container/register';
import { useSchemaRef } from 'hooks/use-schema';

const Graph = styled.div`
  position: fixed;
  left: 300px;
  top: 152px;
  z-index: 0;
`;

export const Schema: React.FC = () => <Graph ref={useSchemaRef()} />;
