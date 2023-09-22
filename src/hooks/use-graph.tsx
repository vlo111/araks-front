/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { initGraph } from 'components/layouts/components/visualisation/container/initial/graph';
import { formattedData } from '../components/layouts/components/visualisation/helpers/format-node';
import { initData } from '../components/layouts/components/visualisation/container/initial/nodes';
import { useGetData } from '../api/visualisation/use-get-data';
import { useProject } from '../context/project-context';

type GraphRef = React.MutableRefObject<HTMLDivElement | null>;

export const useGraphRef = () => {
  const { projectInfo } = useProject();
  const { nodes, edges, count } = useGetData();

  const { graph, setGraph, ...params } = useGraph() ?? {};

  const ref: GraphRef = React.useRef(null);

  useEffect(() => {
    if (graph === undefined && setGraph !== undefined && Object.hasOwn(projectInfo ?? {}, 'role')) {
      setGraph(initGraph(ref.current as HTMLDivElement, params, projectInfo));
    }

    if (graph !== undefined && nodes !== undefined && edges !== undefined) {
      const data = formattedData(nodes, edges);
      if (data !== undefined) initData(graph, data);
      graph.render && graph.render();
    }
    params.setGraphInfo && params.setGraphInfo({ nodeCount: nodes?.length, nodeCountAPI: count });
  }, [nodes, edges, graph, setGraph, projectInfo, count]);

  return ref;
};
