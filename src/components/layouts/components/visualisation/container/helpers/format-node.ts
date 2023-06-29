import { Graph } from '@antv/g6';
import { GraphData } from '../../types';
import { ProjectEdgeResponse } from 'types/project-edge';
import { Nodes } from "api/visualisation/use-get-nodes";

type FormattedData = (graph: Graph, nodesList: Nodes, edgeList: ProjectEdgeResponse[]) => GraphData

export const formattedData: FormattedData = (graph, nodesList, edgeList) => {

  const data: GraphData = {
    nodes: nodesList.map((n) => ({
      id: n.id,
      label: n.name,
      style: {
        stroke: n.nodeType?.color ?? '',
      },
      img: n.default_image,
      type: n.default_image ? 'image' : 'circle',
    })),
    edges: edgeList.map((e) => ({
      id: e.id,
      source: e.source_id,
      target: e.target_id,
      label: e.edgeTypes?.name ?? '',
    })),
  };
  return data;
};
