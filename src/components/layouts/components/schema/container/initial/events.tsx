import {CellRemovePort, ElementBox, ElementStyle, InitEvents, RemoveElement, SelectNode} from '../../types';
import { TypeSettingD } from "../../helpers/svg/path-d";

const removeSelected: RemoveElement = (chart, element) => {
  const type = chart.getCellById(element.dataset.cellId) as CellRemovePort;

  type.removePort('connector');

  type.attr('node_path', undefined)
  type.attr('circle', undefined)

  element.classList.remove('selected-node');
};

export const initEvents: InitEvents = (graph, { setAddPortModal, setSelectedNode, setAddTypeModal }) => {
  graph.on('node:port:click', (event) => {
    if (event.port === 'connector') return;
    const { x, y, height, width } = event.view.container.getBoundingClientRect();

    const bottomX = x + width;
    const bottomY = y + height - 30;

    if (event.port === 'add') {
      setAddPortModal({
        node: event.node,
        portId: 'add',
        isUpdate: false,
        x: bottomX,
        y: bottomY,
      });
    } else {
      // edit
      setAddPortModal({
        node: event.node,
        portId: event.port as string,
        isUpdate: true,
        x: bottomX,
        y: bottomY,
      });
    }
  });

  graph.on('node:click', (event) => {
    const {
      view: { container },
      node,
    } = event;

    if (event.e.target.id === 'setting_circle' || event.e.target.id === 'setting_path') {
      setAddTypeModal([event.x, event.y]);
    }

    if (!container.classList.contains('selected-node')) {

      selectNode(graph, container, node)
      // transform: translate(-1px, 41px) scale(1.01)

      setSelectedNode(node);
    }
  });

  graph.on('blank:click', (event) => {
    const selectedNode: ElementStyle = event.e.target.querySelector('.selected-node');

    if (selectedNode !== null) {
      removeSelected(graph, selectedNode);
      setSelectedNode(undefined);
    }

    if (graph.container.style.cursor === 'crosshair') {
      setAddTypeModal([event.x, event.y]);
    }
  });
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

  const color: string = node.attr('body/stroke');

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

  node.attr('circle',  {
    id: 'setting_circle',
    r: 16,
    cx: 128,
    cy: 21.5,
    strokeWidth: 2,
    fill: '#DBDBDB',
    cursor: 'pointer',
  });

  node.attr('node_path',  {
    id: 'setting_path',
    fill: '#414141',
    cursor: 'pointer',
    d: TypeSettingD,
    transform: `matrix(1,0,0,1,${width - 37.5}, 5.5)`
  });
}
