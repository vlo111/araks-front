import G6 from '@antv/g6';

const layout = {
  type: 'concentric',
  maxLevelDiff: 0.5,
  sortBy: 'degree',
  edgeLength: 10,
  preventOverlap: true,
  nodeSize: 80,
  center: [window.innerWidth / 2, window.innerHeight / 2],
};

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

export const options = {
  height: window.innerHeight - 165,
  width: window.innerWidth - 300,
  fitCenter: true,
  animate: true,
  modes: {
    default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
  },
  defaultEdge,
  defaultNode,
  layout,
};
