import G6, { Graph, IG6GraphEvent } from "@antv/g6";
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
};

const contextMenu = new G6.Menu({
  getContent(evt) {
    const target = evt?.target;
    const isCanvas = target && target.isCanvas && target.isCanvas();

    const isNode = evt?.item?.getType().toUpperCase() === 'NODE';

    const nodeContext = `<div class="menu">
          <span>Open</span>
          <span>Focus on node</span>
          <span>Expand</span>
          <span class="delete">Delete</span>
        </div>`;

    const canvasContext = `<div class="menu">
          <span>Create Node</span>
        </div>`;

    const edgeContext = `<div class="menu">
          <span>Open</span>
          <span class="delete">Delete</span>
        </div>`;

    return isCanvas ? canvasContext : isNode ? nodeContext : edgeContext;
  },
  handleMenuClick: (target, item) => {
    // eslint-disable-next-line no-console
    console.log(target, item);
  },
  offsetX: 16 + 10,
  offsetY: 0,
  itemTypes: ['node', 'edge', 'canvas'],
});

export const initGraph: InitGraph = (container, { startOpenNode }) => {

  const getContent = (evt: IG6GraphEvent | undefined) => {
    const target = evt?.target;
    const isCanvas = target && target.isCanvas && target.isCanvas();

    const isNode = evt?.item?.getType().toUpperCase() === 'NODE';

    const nodeContext = `<div class="menu">
          <span>Open</span>
          <span>Focus on node</span>
          <span>Expand</span>
          <span class="delete">Delete</span>
        </div>`;

    const canvasContext = `<div class="menu">
          <span>Create Node</span>
        </div>`;

    const edgeContext = `<div class="menu">
          <span>Open</span>
          <span class="delete">Delete</span>
        </div>`;

    return isCanvas ? canvasContext : isNode ? nodeContext : edgeContext;
  }

  const contextMenu = new G6.Menu({
    getContent,
    handleMenuClick: (target, item) => {
      // eslint-disable-next-line no-console
      console.log(target, item);
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
  return graph;
};
