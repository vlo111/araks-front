import { Cell, Edge, Graph, Node } from '@antv/x6';
import { IProjectType } from '../../../../../api/types';
import { ProjectEdgeResponse } from '../../../../../types/project-edge';
import { INode, InsertAddProperty, IPort, SetPropertyColor } from '../types';
import { antTheme } from '../../../../../helpers/ant-theme';

const setPropertyColor: SetPropertyColor = (property, color) => {
  const gradient = {
    fill: {
      type: 'linearGradient',
      stops: [
        { offset: '1.47%', color: color },
        { offset: '98.93%', color: `#EEEEEE` },
      ],
    },
  };

  const fill = {
    fill: antTheme.components.Schema.colorDefaultProperty,
  };

  const isConnection = property.ref_property_type_id === 'connection' ? gradient : '';

  return isConnection ? gradient : fill;
};

const insertAddProperty: InsertAddProperty = () => ({
  id: 'add',
  group: 'cell',
  attrs: {
    portBody: {
      fill: antTheme.components.Schema.colorAddProperty,
    },
    portNameLabel: {
      fill: antTheme.components.Schema.colorPropertyText,
      text: '+ Add property',
    },
    portTypeLabel: { text: '' },
  },
});

/**
 * initialization special type data with property for graph chart
 * @param graph
 * @param nodesList
 * @param edges
 */
export const formattedTypes = (graph: Graph, nodesList: IProjectType[], edges: ProjectEdgeResponse[]) => {
  const cells: Cell[] = [];

  /** Set Grid layout if nodes have position 0 0 */
  /** TODO: Make edge for grid layout */
  /*
    if (nodesList?.find((n) => n.fx === 0 && n.fy === 0)) {
      const data = {
        nodes: nodesList,
        edges: [],
        // edges: edges.map(e => ({
        //   id: e.id,
        //   source: e.source_id,
        //   target: e.target_id
        // })),
      };

      const dagreLayout = new GridLayout({
        type: 'grid',
        nodeSize: [200, 300],
        cols: 7,
        rows: 10,
        width: window.innerWidth - 400,
        height: window.innerHeight - 400,
      });

      dagreLayout.layout(data);
    }
    */

  for (const node of nodesList) {
    let formattedNode: INode = {} as INode;
    const formattedProperties: IPort[] = [];

    const { properties } = node;

    for (const property of properties) {
      const color = setPropertyColor(property, node.color);

      formattedProperties.push({
        id: property.id,
        group: 'cell',
        attrs: {
          portBody: color,
          portNameLabel: {
            text: property.name,
          },
          portTypeLabel: {
            text: property.ref_property_type_id,
          },
          required_type: property.required_type,
          multiple_type: property.multiple_type,
          unique_type: property.unique_type,
        },
        zIndex: 0,
      });
    }

    if (!location.pathname.includes('perspectives')) {
      formattedProperties.push(insertAddProperty());
    }

    formattedNode = {
      id: node.id,
      shape: 'er-rect',
      label: node.name,
      position: {
        x: node.x ?? node.fx,
        y: node.y ?? node.fy,
      },
      attrs: {
        body: {
          stroke: node.color,
        },
        parentId: node.parent_id,
      },
      ports: formattedProperties,
    };

    const cell: Node = graph.createNode(formattedNode as Node.Metadata);

    cells.push(cell);
  }

  for (const edge of edges) {
    const source = nodesList.find((n) => n.id === edge.source_id);
    const target = nodesList.find((n) => n.id === edge.target_id);

    const sourceColor = source?.color;
    const targetColor = target?.color;

    const s_prop = source?.properties.find((a) => a.id === edge.source_attribute_id);
    const t_prop = target?.properties.find((a) => a.id === edge.target_attribute_id);

    const formattedEdge = {
      id: edge.id,
      shape: 'er-edge',
      source: {
        cell: edge.source_id,
        port: s_prop?.default_proprty ? undefined : edge.source_attribute_id,
      },
      target: {
        cell: edge.target_id,
        port: t_prop?.default_proprty ? undefined : edge.target_attribute_id,
      },
      attrs: {
        line: {
          stroke: {
            type: 'linearGradient',
            stops: [
              { offset: '50%', color: `${sourceColor}` },
              { offset: '50%', color: `${edge.inverse ? targetColor : sourceColor}` },
            ],
          },
          sourceMarker: {
            fill: sourceColor,
          },
          targetMarker: {
            fill: targetColor,
          },
        },
        name: s_prop?.name || t_prop?.name,
      },
    };

    const cell: Edge<Edge.Properties> = graph.createEdge(formattedEdge as Edge.Metadata);

    cells.push(cell);
  }

  return cells;
};
