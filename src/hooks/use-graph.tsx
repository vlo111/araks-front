/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { initGraph } from 'components/layouts/components/visualisation/container/initial/graph';
import { formattedData } from '../components/layouts/components/visualisation/helpers/format-node';
import { initData } from '../components/layouts/components/visualisation/container/initial/nodes';
import { useGetData } from '../api/visualisation/use-get-data';

type GraphRef = React.MutableRefObject<HTMLDivElement | null>;

export const useGraphRef = () => {
  const { nodes, edges } = useGetData();

  const { graph, setGraph, ...params } = useGraph() ?? {};

  const ref: GraphRef = React.useRef(null);

  useEffect(() => {
    if (graph === undefined && setGraph !== undefined) {
      setGraph(initGraph(ref.current as HTMLDivElement, params));
    }

    if (graph !== undefined && nodes !== undefined && edges !== undefined) {
      const data = formattedData(nodes, edges);
      if (data !== undefined) initData(graph, data);
      graph.render && graph.render();
    }
  }, [nodes, edges, graph, setGraph]);

  return ref;
};
