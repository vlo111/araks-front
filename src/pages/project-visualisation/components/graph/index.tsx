import React from 'react';
import { useGraphRef } from 'hooks/use-graph';
import { Wrapper } from './wrapper';
import { useGetData } from 'api/visualisation/use-get-data';
import { GraphLoading } from 'components/loading/graph-loading';

export const Graph: React.FC = () => {
  const { nodes, edges, count, isInitialLoading } = useGetData();

  const ref = useGraphRef({ nodes, edges, count });

  return (
    <>
      {isInitialLoading && <GraphLoading />}
      <Wrapper ref={ref} />
    </>
  );
};
