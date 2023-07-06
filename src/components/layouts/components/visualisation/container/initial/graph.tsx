import G6, { Graph, IG6GraphEvent } from '@antv/g6';
import { InitGraph } from '../../types';

const defaultEdge = {
  labelCfg: {
    autoRotate: true,
    style: {
      fontSize: 14,
      fontWeight: '600',
      fill: '#000000',
      background: {
        fill: '#F2F2F2',
        padding: [2, 2, 2, 2],
        radius: 2,
      },
    },
  },
  style: {
    lineWidth: 2,
    stroke: '#C3C3C3',
    endArrow: {
      fill: '#C3C3C3',
      path: G6.Arrow.triangle(15, 20, 5),
      d: 5,
    },
  },
};

const defaultNode = {
  style: {
    lineWidth: 10,
    fill: 'white',
  },
  clipCfg: {
    show: true,
    type: 'circle',
    r: 30,
    rx: 10,
    ry: 15,
    width: 15,
    height: 15,
    x: 0,
    y: 0,
  },
  labelCfg: {
    style: {
      fontSize: 16,
      fill: '#414141',
      fontWeight: '600',
      background: {
        padding: [3, 2, 3, 2],
        radius: 2,
        lineWidth: 3,
      },
    },
    offset: 10,
    position: 'bottom',
  },
  size: 60,
};

export const initGraph: InitGraph = (container, { startOpenNode, startOpenNodeCreate }) => {
  const getContent = (evt: IG6GraphEvent | undefined) => {
    const target = evt?.target;
    const isCanvas = target && target.isCanvas && target.isCanvas();

    const isNode = evt?.item?.getType() === 'node';

    startOpenNodeCreate({
      isOpened: false,
      x: evt?.x ?? 0,
      y: evt?.y ?? 0,
    });

    const nodeContext = `<div class="menu">
          <span>Focus on node</span>
          <span>Expand</span>
          <span class="delete">Delete</span>
        </div>`;

    const canvasContext = `<div class="menu">
          <span>Create Node</span>
        </div>`;

    const edgeContext = `<div class="menu">
          <span class="delete">Delete</span>
        </div>`;

    return isCanvas ? canvasContext : isNode ? nodeContext : edgeContext;
  };

  const contextMenu = new G6.Menu({
    getContent,
    handleMenuClick: (target, item) => {
      if (item?._cfg?.type === 'node') {
        startOpenNode({
          id: item.getID(),
        });
      } else if (item?._cfg?.type === 'edge') {
      } else {
        startOpenNodeCreate({ isOpened: true });
      }
    },
    offsetX: 16 + 10,
    offsetY: 0,
    itemTypes: ['node', 'edge', 'canvas'],
  });

  const graph = new Graph({
    container: container,
    height: window.innerHeight - 165,
    width: window.innerWidth - 300,
    fitCenter: true,
    modes: {
      default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
    },
    animate: true,
    defaultEdge,
    defaultNode,
    plugins: [contextMenu],
  });

  graph.on('dblclick', (evt) => {
    startOpenNode({
      id: evt.item?.getID() ?? '',
    });
  });

  return graph;
};
