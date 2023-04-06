import { IProjectType, ITypeProperty } from '../../../../../api/types';
import { INode, IPort, IPortFill } from '../types';
import { antTheme } from '../../../../../helpers/ant-theme';

type SetPropertyColor = (property: ITypeProperty, color: string) => { fill: IPortFill } | { fill: string };

type InsertAddProperty = () => IPort;

const setPropertyColor: SetPropertyColor = (property, color) => {
  const gradient = {
    fill: {
      type: 'linearGradient',
      stops: [
        { offset: '15%', color: `${color}B3` },
        { offset: '100%', color: `${color}33` },
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
 * @param nodesList
 */
export const formattedTypes = (nodesList: IProjectType[]) => {
  const formattedNode: INode[] = [];

  for (const node of nodesList) {
    const formattedProperty: IPort[] = [];

    const { properties } = node;

    for (const property of properties) {
      const color = setPropertyColor(property, node.color);

      formattedProperty.push({
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
      });
    }

    formattedProperty.push(insertAddProperty());

    formattedNode.push({
      id: node.id,
      shape: 'er-rect',
      label: node.name,
      position: node.position,
      attrs: {
        body: {
          stroke: node.color,
        },
      },
      ports: formattedProperty,
    });
  }

  return formattedNode;
};
