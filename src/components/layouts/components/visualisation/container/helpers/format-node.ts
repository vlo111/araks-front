import { Graph } from '@antv/g6';
import { GraphData } from '../../types';
import { ProjectEdgeResponse } from 'types/project-edge';

export const formattedData = (
  graph: Graph,
  nodesList: { node_id: string; node_name: string; type_color: string }[],
  edgeList: ProjectEdgeResponse[]
) => {
  if (nodesList === undefined) return [];

  const data: GraphData = {
    nodes: nodesList.map((n) => ({
      id: n.node_id,
      label: n.node_name,
      size: 60,
      style: {
        lineWidth: 10,
        fill: '#808080',
        stroke: n.type_color,
      },
    })),
    edges: edgeList.map((e) => ({
      id: e.id,
      source: e.source_id,
      target: e.target_id,
      label: e.ProjectsEdgeType?.name ?? '',
    })),
  };
  return data;
};
