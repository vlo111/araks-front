import { Cell, Edge, Graph, Node } from '@antv/x6';
import { IProjectType } from 'api/types';
import { ProjectEdgeResponse } from 'types/project-edge';
import { INode, InsertAddProperty, InsertProperty, IPort, SetPropertyColor } from '../types';
import { antTheme } from 'helpers/ant-theme';
import { getProperties, isPerspective } from './utils';
import { EyeD, EyePointD } from './svg/path-d';

const setPropertyColor: SetPropertyColor = (ref_property_type_id, color) => {
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

  const isConnection = ref_property_type_id === 'connection' ? gradient : '';

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

const insertProperty: InsertProperty = ({
                                          color,
                                          id,
                                          name,
                                          required_type,
                                          multiple_type,
                                          unique_type,
                                          ref_property_type_id,
                                        }) => ({
  id: id,
  group: 'cell',
  attrs: {
    portNameLabel: {
      text: name,
    },
    portBody: setPropertyColor(ref_property_type_id, color),
    portTypeLabel: {
      text: ref_property_type_id,
      refX: isPerspective() ? 85 : 95,
    },
    eye: isPerspective() ? { d: EyeD } : undefined,
    eye_point: isPerspective() ? { d: EyePointD } : undefined,
    required_type: required_type,
    multiple_type: multiple_type,
    unique_type: unique_type,
  },
  zIndex: 0,
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

    for (const property of properties) formattedProperties.push(insertProperty({ ...property, color: node.color }));

    if (!isPerspective()) formattedProperties.push(insertAddProperty());

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
    const { color, targetColor, name, targetName, targetDefault, default_proprty } = getProperties(nodesList, edge);

    const formattedEdge = {
      id: edge.id,
      shape: 'er-edge',
      source: {
        cell: edge.source_id,
        port: default_proprty ? undefined : edge.source_attribute_id,
      },
      target: {
        cell: edge.target_id,
        port: targetDefault ? undefined : edge.target_attribute_id,
      },
      attrs: {
        line: {
          stroke: {
            type: 'linearGradient',
            stops: [
              { offset: '50%', color: `${color}` },
              { offset: '50%', color: `${edge.inverse ? targetColor : color}` },
            ],
          },
          sourceMarker: {
            fill: color,
          },
          targetMarker: {
            fill: targetColor,
          },
        },
        name: name || targetName,
      },
    };

    const cell: Edge<Edge.Properties> = graph.createEdge(formattedEdge as Edge.Metadata);

    cells.push(cell);
  }

  return cells;
};
