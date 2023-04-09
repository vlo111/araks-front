import { IProjectType } from '../../../../../api/types';
import { INode, InsertAddProperty, IPort, SetPropertyColor } from "../types";
import { antTheme } from '../../../../../helpers/ant-theme';
import { Cell, Graph, Node } from "@antv/x6";

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
      fill: {
        type: 'linearGradient',
        stops: [
          { offset: '0%', color: `${antTheme.components.Schema.colorAddProperty}B3` },
          { offset: '100%', color: `${antTheme.components.Schema.colorAddProperty}33` },
        ],
      },
    },
    portNameLabel: {
      fill: antTheme.components.Schema.colorPropertyText,
      text: '+ Add property',
    },
  },
});

/**
 * initialization special type data with property for graph chart
 * @param graph
 * @param nodesList
 */
export const formattedTypes = (graph: Graph, nodesList: IProjectType[]) => {
  const cells: Cell[] = [];

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
        },
        zIndex: 0,
      });
    }

    formattedProperties.push(insertAddProperty());

    formattedNode = {
      id: node.id,
      shape: 'er-rect',
      label: node.name,
      position: {
        x: Math.random() * (1000 - -600) + -600,
        y: Math.random() * (350 - -250) + -250,
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

  return cells;
};
