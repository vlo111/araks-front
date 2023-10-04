import React from 'react';
import { useGraphRef } from 'hooks/use-graph';
import { Wrapper } from './wrapper';
import { useGetData } from 'api/visualisation/use-get-data';

export const Graph: React.FC = () => {
  const { nodes, edges, count, relationsCounts } = useGetData();

  const ref = useGraphRef({ nodes, edges, count, relationsCounts });

  return <Wrapper ref={ref} />;
};
