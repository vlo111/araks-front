import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { initGraph } from 'components/layouts/components/schema/container/initial/graph';
import 'components/layouts/components/schema/container/register';

type GraphRef = React.MutableRefObject<HTMLDivElement | null>;

const Graph = styled.div`
  position: fixed;
  left: 250px;
  top: 152px;
  z-index: 0;
`;

export const Schema: React.FC = () => {
  const { graph, setGraph, ...params } = useSchema() ?? {};

  const ref: GraphRef = React.useRef(null);

  useEffect(() => {
    if (graph === undefined && setGraph !== undefined) {
      setGraph(initGraph(ref.current as HTMLDivElement, params));
    }
  }, [graph, setGraph, params]);

  return <Graph ref={ref} />;
};
