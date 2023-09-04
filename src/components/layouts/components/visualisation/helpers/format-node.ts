import { Graph } from '@antv/g6';
import { GraphData } from '../types';
import { Edges, Nodes } from 'api/visualisation/use-get-data';

type FormattedData = (graph: Graph, nodesList: Nodes, edgeList: Edges) => GraphData;

export const formattedData: FormattedData = (graph, nodesList, edgeList) => {
  const data: GraphData = {
    nodes: nodesList.records.map(({ _fields }) => ({
      id: _fields[0].properties.id,
      label: _fields[0].properties.name,
      style: {
        stroke: _fields[0].properties.color ?? '',
      },
      img: _fields[0].properties.image_url,
      type: _fields[0].properties.image_url ? 'image' : 'circle',
      nodeType: _fields[0].properties.project_type_id,
      nodeTypeName: _fields[0].labels[0],
    })),
    edges: edgeList.records.map(({ _fields }) => ({
      id: _fields[0].properties.id,
      project_edge_type_id: _fields[0].properties.project_edge_type_id,
      source: _fields[0].properties.source_id,
      target: _fields[0].properties.target_id,
      label: _fields[0].type ?? '',
    })),
  };
  return data;
};
