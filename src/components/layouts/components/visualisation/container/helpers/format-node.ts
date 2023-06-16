import { Graph } from '@antv/g6';
import { IProjectType } from 'api/types';
import { ProjectEdgeResponse } from 'types/project-edge';
import { GraphData } from "../../types";

export const formattedData = (graph: Graph, nodesList: IProjectType[], edges: ProjectEdgeResponse[]) => {
  const data: GraphData = {
    nodes: nodesList.map((n) => ({
      id: n.id,
      label: n.name,
      size: 60,
      style: {
        lineWidth: 10,
        fill: '#808080',
        stroke: n.color,
      },
    })),
    edges: edges.map((e) => ({
      id: e.id,
      source: e.source_id,
      target: e.target_id,
      label: e.name,
    })),
  };
  return data;
};
