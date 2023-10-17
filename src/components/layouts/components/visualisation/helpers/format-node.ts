import { Edges, Nodes } from 'api/visualisation/use-get-data';
import { GraphData, Node, Edge } from '../types';

type FormattedData = (nodesList: Nodes, edgeList: Edges, relationsCounts: { [key: string]: number }) => GraphData;

type FieldProperty = { labels: string[]; properties: { [key: string]: never } };

type FormatNodeProperty = { typeName: string; properties: { [p: string]: never } };

export const formattedData: FormattedData = (nodesList, edgeList, relationsCounts) => {
  if (!relationsCounts) return {} as GraphData;

  const nodes: (Node & { edgeCount?: number })[] = [];

  nodesList.forEach(({ _fields }) => {
    _fields?.forEach((node, index) => {
      if (!node.hasOwnProperty('low')) {
        const field = node as FieldProperty;

        const [typeName, properties] = [field.labels[0], field.properties];

        const params = {
          ...formatNodeProperty({ typeName, properties }),
          edgeCount: relationsCounts[field.properties.id] ?? 0,
        };
        nodes.push(params);
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

  return { nodes, edges } as GraphData;
};

const formatNodeProperty = ({ typeName, properties }: FormatNodeProperty) => {
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
    img: `${process.env.REACT_APP_AWS_URL}${default_image}`,
    type: default_image ? 'image' : 'circle',
    nodeType: project_type_id,
    nodeTypeName: typeName,
    properties: { ...params },
  };
};
