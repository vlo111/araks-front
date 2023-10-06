import React from 'react';
import { useGraphRef } from 'hooks/use-graph';
import { Wrapper } from './wrapper';
import { useGetData } from 'api/visualisation/use-get-data';
import { Spin } from 'antd';

export const Graph: React.FC = () => {
  const { nodes, edges, count, relationsCounts, isInitialLoading } = useGetData();

  const ref = useGraphRef({ nodes, edges, count, relationsCounts });

  return (
    <Spin style={{ maxHeight: '100%' }} spinning={isInitialLoading}>
      <Wrapper ref={ref} />
    </Spin>
  );
};
