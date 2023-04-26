import { Node } from '@antv/x6';
import {
  AnimateGraphFit,
  CellRemovePort,
  ElementBox,
  ElementStyle,
  GetTypeColors,
  RemoveElement,
  SelectNode,
  SelectNodeWithZoom,
} from '../types';
import { TypeSettingD } from './svg/path-d';
import { LINE_HEIGHT } from '../container/register/node';
import { PATH } from 'helpers/constants';

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
    animateGraphFit(graph, '0.4s');

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

export const animateGraphFit: AnimateGraphFit = (graph, sec) => {
  const stage = graph.view.stage.parentElement as HTMLElement;
  stage.style.transitionDuration = sec;
  setTimeout(() => {
    stage.style.transitionDuration = '0s';
  }, 10);
};

export const getTypeColors: GetTypeColors = (edge) => [
  edge.attr(PATH.EDGE_SOURCE_COLOR),
  edge.attr(PATH.EDGE_TARGET_COLOR),
];
