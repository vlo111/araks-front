/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { initGraph } from 'components/layouts/components/visualisation/container/initial/graph';
import { useGetNodes } from '../api/visualisation/use-get-nodes';
import { useGetVEdges } from '../api/visualisation/use-get-edges';
import { formattedData } from '../components/layouts/components/visualisation/helpers/format-node';
import { initData } from '../components/layouts/components/visualisation/container/initial/nodes';

type GraphRef = React.MutableRefObject<HTMLDivElement | null>;

export const useGraphRef = () => {
  const { nodes } = useGetNodes();

  const { edges } = useGetVEdges();

  const { graph, setGraph, ...params } = useGraph() ?? {};

  const ref: GraphRef = React.useRef(null);

  useEffect(() => {
    if (graph === undefined && setGraph !== undefined) {
      setGraph(initGraph(ref.current as HTMLDivElement, params));
    }

    if (graph !== undefined && nodes !== undefined && edges !== undefined) {
      const data = formattedData(graph, nodes, edges ?? []);
      if (data !== undefined) initData(graph, data);
      graph.render();
    }
  }, [nodes, edges, graph, setGraph]);

  return ref;
};
