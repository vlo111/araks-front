import React from 'react';
import styled from 'styled-components';
import 'components/layouts/components/schema/container/register';
import { useSchemaRef } from 'hooks/use-schema';
import { useIsXXlScreen } from 'hooks/use-breakpoint';

const Graph = styled.div`
  position: fixed;
  left: 300px;
  top: 130px;
  z-index: 0;
`;

export const Schema: React.FC = () => {
  const isXXl = useIsXXlScreen();

  return <Graph style={{ top: isXXl ? '152px' : '130px' }} ref={useSchemaRef()} />;
};
