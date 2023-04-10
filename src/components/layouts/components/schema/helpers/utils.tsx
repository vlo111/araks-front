import { Cell, Graph, Node } from '@antv/x6';
import { IProjectType } from 'api/types';
import { antTheme } from 'helpers/ant-theme';
import { INode, InsertAddProperty, IPort, SetPropertyColor } from '../types';

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
    portTypeLabel: { text: '' }
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
          required_type: property.required_type,
          multiple_type: property.multiple_type,
          unique_type: property.unique_type,
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
