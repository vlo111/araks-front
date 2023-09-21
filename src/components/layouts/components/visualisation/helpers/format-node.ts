import { GraphData, Node, Edge } from '../types';
import { Edges, Nodes } from 'api/visualisation/use-get-data';

type FormattedData = (nodesList: Nodes, edgeList: Edges) => GraphData;

export const formattedData: FormattedData = (nodesList, edgeList) => {
  const data: GraphData = {
    nodes: nodesList.map(({ _fields }) => ({
      ...formatNodeProperty({
        typeName: _fields[0].labels[0],
        properties: _fields[0].properties,
      }),
      edgeCount: _fields[1]?.low,
    })),
    edges: edgeList.map(({ _fields }) => ({
      id: _fields[0].properties.id,
      project_edge_type_id: _fields[0].properties.project_edge_type_id,
      source: _fields[0].properties.source_id,
      target: _fields[0].properties.target_id,
      label: _fields[0].type ?? '',
    })),
  };

  return data;
};

const formatNodeProperty = ({ typeName, properties }: { typeName: string; properties: { [p: string]: never } }) => {
  const {
    created_at,
    updated_at,
    user_id,
    project_type_parent_id,
    id,
    color,
    default_image,
    name,
    project_type_id,
    project_id,
    ...params
  } = properties;

  return {
    id,
    color,
    label: name,
    style: {
      stroke: color ?? '',
    },
    img: default_image,
    type: default_image ? 'image' : 'circle',
    nodeType: project_type_id,
    nodeTypeName: typeName,
    properties: { ...params },
  };
};

export const formattedSearchData: FormattedData = (nodesList, edgeList) => {
  const nodes: Node[] = [];

  nodesList.forEach(({ _fields }) => {
    _fields?.forEach((node) => {
      if (node) {
        const fieldNode = node as { labels: string[]; properties: { [key: string]: never } };
        const [typeName, properties] = [fieldNode.labels[0], fieldNode.properties];
        nodes.push(formatNodeProperty({ typeName, properties }));
      }
    });
  });

  const edges: Edge[] = [];

  edgeList.forEach(({ _fields }) => {
    _fields?.forEach((edge) => {
      if (edge) {
        edges.push({
          id: edge.properties.id ?? '',
          project_edge_type_id: edge.properties.project_edge_type_id,
          source: edge.properties.source_id,
          target: edge.properties.target_id,
          label: edge.type ?? '',
        });
      }
    });
  });

  const data: GraphData = {
    nodes,
    edges,
  };

  return data;
};
