import { createRoot } from 'react-dom/client';
import { Cell, Graph } from "@antv/x6";
import { Options } from '@antv/x6/lib/graph/options';
import { EdgeSvg } from '../svg/edge-svg';
import { antTheme } from '../../../../../../helpers/ant-theme';

import {
  BoundingEvent,
  CellRemovePort,
  EdgeCreate,
  EdgeLabel,
  ElementBox,
  ElementStyle,
  InitEvents,
  InitGraph,
  INode,
  OnEdgeLabelRendered,
  RemoveElement,
} from '../../types';

import Connecting = Options.Connecting;

const onEdgeLabel: OnEdgeLabelRendered = ({ edge, selectors }, setOpenLinkPropertyModal, nodes) => {
  /** This label is svg foreign object that is rendered on chart as edge property icon */
  const label = selectors['foContent'] as HTMLDivElement;

  if (label !== undefined) {
    label.style.display = 'flex';
    label.style.alignItems = 'center';
    label.style.justifyContent = 'center';

    label.onmouseenter = (e: MouseEvent) => {
      (e as MouseEvent & { target: { style: { cursor: string } } }).target.style.cursor = 'pointer';
    };

    label.onmouseleave = (e) => {
      (e as MouseEvent & { target: { style: { cursor: string } } }).target.style.cursor = 'auto';
    };

    label.addEventListener('click', (e) => {
      const colors: Array<{ color: string }> = edge.attr('line/stroke/stops');

      const target = e.target as BoundingEvent;

      const bounding = target?.tagName === 'path' ? target.previousElementSibling.firstChild : target;

      const { x, y, height, width } = bounding?.getBoundingClientRect();

      setOpenLinkPropertyModal({
        x: x + width / 2,
        y: y + height,
        color: colors.map((s: { color: string }) => s.color),
      });
    });

    const stroke = nodes?.find((d: INode) => d.id === edge.id)?.attrs.line?.stroke;

    if (stroke !== undefined) {
      const root = createRoot(label);

      root.render(<EdgeSvg id={edge.id} stroke={stroke} />);
    }
  }
};

const removeSelected: RemoveElement = (chart, element) => {
  const type = chart.getCellById(element.dataset.cellId) as CellRemovePort;

  type.removePort('connector');

  element.classList.remove('selected-node');
};

const initEvents: InitEvents = (graph, params) => {
  const { setAddPortModal, setSelectedNode, setOpenAddType } = params;

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

    if (!container.classList.contains('selected-node')) {
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
      setOpenAddType([event.x, event.y]);
    }
  });
};

export const initGraph: InitGraph = (container, _params, nodes) => {
  const connecting: Partial<Connecting> = {
    connector: 'smooth',
    router: {
      name: 'er',
      args: {
        offset: 'center',
        direction: 'H',
      },
    },
    validateEdge(item: EdgeCreate) {
      // eslint-disable-next-line no-console
      console.log(item);

      return false;
    },
    createEdge(item) {
      return this.createEdge({
        shape: 'er-edge',
        router: {
          name: 'normal',
        },
        attrs: {
          line: {
            sourceMarker: {
              name: 'path',
              d: '',
            },
            strokeDasharray: '5 5',
            stroke: item.sourceCell.attr('body/stroke'),
          },
        },
        zIndex: -1,
      });
    },
  };

  const grid = {
    size: 10,
    visible: true,
    type: 'doubleMesh',
    args: [
      {
        color: antTheme.components.Schema.colorGridThickness,
        thickness: 1,
      },
      {
        color: antTheme.components.Schema.colorGridLine,
        thickness: 2,
        factor: 10,
      },
    ],
  };

  const mousewheel = {
    enabled: true,
    zoomAtMousePosition: true,
    modifiers: 'ctrl',
    minScale: 0.5,
    maxScale: 3,
  };

  const onEdgeLabelRendered: EdgeLabel = (args) => onEdgeLabel(args, _params.setOpenLinkPropertyModal, nodes);

  const options = {
    container: container,
    panning: true,
    height: window.innerHeight - 84 - 44,
    width: window.innerWidth,
    background: { color: antTheme.components.Schema.colorBg },
    grid,
    mousewheel,
    onEdgeLabelRendered,
    connecting,
  };

  const graph = new Graph(options);

  initEvents(graph, _params);

  const cells: Cell[] = [];

  nodes.forEach((item) => {
    if (item.shape === 'er-edge') {
      // const newItem = _.cloneDeep(item);
      // InitPortColors(newItem);

      cells.push(graph.createEdge(item));
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cells.push(graph.createNode(item));
    }
  });

  graph.resetCells(cells);

  graph.zoomToFit({ padding: 10, maxScale: 1 });

  return graph;
};
