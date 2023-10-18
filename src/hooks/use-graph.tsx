/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { initGraph } from 'components/layouts/components/visualisation/container/initial/graph';
import { formattedData } from '../components/layouts/components/visualisation/helpers/format-node';
import { initData } from '../components/layouts/components/visualisation/container/initial/nodes';
import { Edges, Nodes } from '../api/visualisation/use-get-data';
import { useProject } from '../context/project-context';
import { useLocation } from 'react-router-dom';
import { expandByNodeData, graphRender } from '../components/layouts/components/visualisation/helpers/utils';
import { nodeLabelCfgStyle } from '../components/layouts/components/visualisation/helpers/constants';
type GraphRef = React.MutableRefObject<HTMLDivElement | null>;

type Props = ({
  nodes,
  edges,
  count,
  relationsCounts,
}: {
  nodes: Nodes | undefined;
  edges: Edges | undefined;
  count: number;
  relationsCounts: { [key: string]: number };
}) => GraphRef;

export const useGraphRef: Props = ({ nodes, edges, count, relationsCounts }) => {
  const { state } = useLocation();
  const { projectInfo } = useProject();

  const { graph, setGraph, ...params } = useGraph() ?? {};

  const ref: GraphRef = React.useRef(null);

  useEffect(() => {
    if (graph === undefined && setGraph !== undefined && Object.hasOwn(projectInfo ?? {}, 'role')) {
      setGraph(initGraph(ref.current as HTMLDivElement, params, projectInfo));
    }

    if (graph !== undefined && nodes !== undefined && edges !== undefined) {
      if (state?.data) {
        focus();
      } else {
        const data = formattedData(nodes, edges, relationsCounts);

        if (data !== undefined) initData(graph, data);
      }

      graphRender(graph);
    }
    params.setGraphInfo && params.setGraphInfo({ nodeCount: nodes?.length, nodeCountAPI: count });
  }, [nodes, edges, graph, setGraph, projectInfo, count]);

  const focus = () => {
    const { nodes } = formattedData(state?.data.nodes, [], state?.data.relationsCounts);
    if (nodes !== undefined) initData(graph, { nodes, edges: [] });

    const focuses = async () => {
      const node = nodes[0];

      graph.addItem('node', {
        ...node,
        labelCfg: nodeLabelCfgStyle,
      });

      const item = graph.getNodes()[0];

      await expandByNodeData(graph, item, node.id, '', 'all', params.setGraphInfo);

      graph.fitView(0, { ratioRule: 'min', direction: 'both', onlyOutOfViewPort: false }, true);
    };

    focuses().then();
  };

  return ref;
};
