import { Cell, Graph, Node } from '@antv/x6';
import { IProjectType } from 'api/types';
import { antTheme } from 'helpers/ant-theme';
import {
  CellRemovePort,
  ElementBox,
  ElementStyle,
  INode,
  InsertAddProperty,
  IPort,
  RemoveElement,
  SelectNode,
  SelectNodeWithZoom,
  SetPropertyColor,
} from '../types';
import { TypeSettingD } from './svg/path-d';
import { LINE_HEIGHT } from '../container/register/node';
import { PATH } from 'helpers/constants';

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
        x: node?.fx ?? Math.random() * (1000 - -600) + -600,
        y: node?.fy ?? Math.random() * (350 - -250) + -250,
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

export const removeSelected: RemoveElement = (chart, element) => {
  const type = chart.getCellById(element.dataset.cellId) as CellRemovePort;

  type.removePort('connector');

  type.attr('setting_path', undefined);
  type.attr('setting_circle', undefined);

  element.classList.remove('selected-node');
};

export const selectNode: SelectNode = (graph, container, node) => {
  const nodes: NodeListOf<ElementStyle> = graph.view.stage.querySelectorAll('.x6-node');

  for (const node of nodes) {
    if (node.classList.contains('selected-node')) {
      removeSelected(graph, node);
      break;
    }
  }

  container.classList.add('selected-node');

  const color: string = node.attr(PATH.NODE_COLOR);

  const { height, width } = (container as ElementBox).getBBox();

  node.addPort({
    id: 'connector',
    group: 'connector',
    attrs: {
      link_circle: {
        fill: color,
        cx: 150,
        cy: height / 2,
      },
      link_rect: {
        stroke: color,
        x: 1,
        width: 148,
        height,
      },
      link_path: {
        transform: `matrix(1,0,0,1,${width - 16}, ${height / 2 - 16})`,
      },
    },
    args: {
      x: 0,
      y: 0,
    },
  });

  node.attr('setting_circle', {
    id: 'setting_circle',
    r: 12,
    cx: 128,
    cy: 21.5,
    strokeWidth: 2,
    fill: '#DBDBDB',
    cursor: 'pointer',
  });

  node.attr('setting_path', {
    id: 'setting_path',
    fill: '#414141',
    cursor: 'pointer',
    d: TypeSettingD,
    transform: `matrix(1,0,0,1,${width - 30.1}, 12.8)`,
  });
};

export const selectNodeWithZoom: SelectNodeWithZoom = (id, graph, selectedNode, setSelectedNode) => {
  if (id !== (selectedNode as Node<Node.Properties>)?.id) {
    animateGraphFit(graph);

    const container: Element = Array.from(graph.view.stage.childNodes)
      .filter((n) => (n as Element).tagName === 'g')
      .find(
        (n) => (n as ChildNode & { getAttribute: (item: string) => string }).getAttribute('data-cell-id') === id
      ) as Element;

    const node = graph.getNodes().find((n) => n.id === id) as Node<Node.Properties>;

    selectNode(graph, container, node);

    setSelectedNode(node);

    /** calculate height of type before fit on center */
    graph.zoom(0.5, {
      minScale: 2,
      maxScale: 2,
    });

    const propertiesHeight = node.ports.items.length * LINE_HEIGHT * 2;

    const height = (propertiesHeight + node.getSize().height) / 2;

    graph.options.height = graph.options.height - height;

    graph.centerCell(node);

    /** reset graph height after fit on center */
    graph.options.height = graph.options.height + height;
  }
};

export const animateGraphFit: (graph: Graph) => void = (graph) => {
  const stage = graph.view.stage.parentElement as HTMLElement;
  stage.style.transitionDuration = '0.4s';
  setTimeout(() => {
    stage.style.transitionDuration = '0s';
  }, 10);
};
