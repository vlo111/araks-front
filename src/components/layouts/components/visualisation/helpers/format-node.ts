import { Graph } from '@antv/g6';
import { GraphData } from '../types';
import { Edges, Nodes } from 'api/visualisation/use-get-data';

type FormattedData = (graph: Graph, nodesList: Nodes, edgeList: Edges) => GraphData;

export const formattedData: FormattedData = (graph, nodesList, edgeList) => {
  const data: GraphData = {
    nodes: nodesList.records.map(({ _fields }) => {
      const properties = _fields[0].properties;

      const {
        created_at,
        updated_at,
        user_id,
        project_type_parent_id,
        id,
        color,
        image_url,
        name,
        project_type_id,
        project_id,
        ...params
      } = properties;

      return {
        id,
        label: name,
        style: {
          stroke: color ?? '',
        },
        img: image_url,
        type: image_url ? 'image' : 'circle',
        nodeType: project_type_id,
        nodeTypeName: _fields[0].labels[0],
        properties: { ...params },
      };
    }),
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
