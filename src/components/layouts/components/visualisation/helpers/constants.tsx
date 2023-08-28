import G6 from '@antv/g6';
import { renderTooltipModal } from './tooltip';

const layout = {
  type: 'random',
  width: window.innerWidth - 480,
  height: window.innerHeight - 165,
};

const defaultEdge = {
  labelCfg: {
    autoRotate: true,
    style: {
      fontSize: 10,
      fontWeight: '600',
      fill: '#605f5f',
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
      path: G6.Arrow.triangle(10, 15, 5),
      d: 5,
    },
  },
};

const defaultNode = {
  style: {
    lineWidth: 3,
    fill: 'white',
  },
  clipCfg: {
    show: true,
    type: 'circle',
    r: 20,
    rx: 10,
    ry: 15,
    width: 15,
    height: 15,
    x: 0,
    y: 0,
  },
  labelCfg: {
    style: {
      fontSize: 14,
      fill: '#151515',
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
  size: 40,
};

export const options = {
  height: window.innerHeight - 165,
  width: window.innerWidth,
  fitCenter: true,
  fitView: true,
  animate: true,
  modes: {
    default: [
      'drag-canvas',
      'drag-node',
      'zoom-canvas',
      'create-edge',
      {
        type: 'tooltip',
        formatText: (model: { [key: string]: unknown }) => {
          return renderTooltipModal(model);
        },
        offset: 10,
      },
    ],
  },
  defaultEdge,
  defaultNode,
  layout,
};
