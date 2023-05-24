import { Cell, Edge, Graph, Node } from '@antv/x6';
import { IProjectType } from 'api/types';
import { ProjectEdgeResponse } from 'types/project-edge';
import { INode, InsertAddProperty, InsertProperty, IPort, SetPropertyColor } from '../types';
import { antTheme } from 'helpers/ant-theme';
import { isPerspective } from './utils';
import { EyeD } from './svg/path-d';
import { SELECTORS } from 'helpers/constants';

const { colorDefaultProperty, colorAddProperty, colorPropertyType } = antTheme.components.Schema;
const { PORT_NAME_TEXT, PORT_BODY_RECT, PORT_TYPE_TEXT, PORT_EYE_PATH } = SELECTORS;

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

  const isConnection = ref_property_type_id === 'connection' ? gradient : '';

  return isConnection ? gradient : { fill: colorDefaultProperty };
};

const insertAddProperty: InsertAddProperty = () => ({
  id: 'add',
  group: 'cell',
  attrs: {
    [PORT_BODY_RECT]: { fill: colorAddProperty },
    [PORT_NAME_TEXT]: {
      fill: colorPropertyType,
      text: '+ Add property',
    },
    [PORT_TYPE_TEXT]: { text: '' },
  },
});

const insertProperty: InsertProperty = ({ id, color, name, ref_property_type_id, ...props }) => ({
  id,
  group: 'cell',
  zIndex: 0,
  attrs: {
    [PORT_TYPE_TEXT]: { text: ref_property_type_id, refX: isPerspective() ? 85 : 95 },
    [PORT_BODY_RECT]: setPropertyColor(ref_property_type_id, color),
    [PORT_EYE_PATH]: props.allow
      ? { d: EyeD, refX: 130, refY: 11, fill: colorPropertyType, cursor: 'pointer' }
      : undefined,
    [PORT_NAME_TEXT]: { text: name },
    ref_property_type_id,
    ...props,
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
      const props = {
        allow: isPerspective(),
        color: node.color,
      };
      formattedProperties.push(insertProperty({ ...props, ...property }));
    }

    const edgeProperties = edges.filter((e) => e.source_id === node.id || e.target_id === node.id);

    for (const { id, name, inverse, multiple, source_id } of edgeProperties) {
      if (inverse || (source_id === node.id)) {
        formattedProperties.push(
          insertProperty({
            id: id || '',
            name,
            allow: false,
            color: node.color,
            ref_property_type_id: 'connection',
            multiple_type: multiple,
          })
        );
      }
    }

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
          cursor: 'pointer',
          allow: isPerspective(),
        },
        parentId: node.parent_id,
        [PORT_EYE_PATH]: isPerspective()
          ? { d: EyeD, refX: 130, refY: 17, fill: colorPropertyType, cursor: 'pointer' }
          : undefined,
      },
      ports: formattedProperties,
    };

    const cell: Node = graph.createNode(formattedNode as Node.Metadata);

    cells.push(cell);
  }

  for (const { id, name, source, source_id, target, target_id, inverse } of edges) {
    const formattedEdge = {
      id: id,
      shape: 'er-edge',
      source: {
        cell: source_id,
        port: id,
      },
      target: {
        cell: target_id,
        port: source_id === target_id ? target_id : id,
      },
      attrs: {
        line: {
          stroke: {
            type: 'linearGradient',
            stops: [
              { offset: '50%', color: `${source?.color}` },
              { offset: '50%', color: `${inverse ? target?.color : source?.color}` },
            ],
          },
          sourceMarker: {
            fill: source?.color,
          },
          targetMarker: {
            fill: target?.color,
          },
        },
        name: name,
      },
    };

    const cell: Edge<Edge.Properties> = graph.createEdge(formattedEdge as Edge.Metadata);

    cells.push(cell);
  }

  return cells;
};
