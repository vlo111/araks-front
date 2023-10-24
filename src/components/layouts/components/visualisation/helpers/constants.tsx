import G6 from '@antv/g6';
import { renderTooltipModal } from './tooltip';

export const edgeLabelCfgStyle = {
  style: {
    opacity: 1,
    fontSize: 10,
    fontWeight: 600,
    fill: '#605f5f',
    background: {
      fill: '#F2F2F2',
      padding: [2, 2, 2, 2],
      radius: 2,
    },
  },
};

export const nodeLabelCfgStyle = {
  style: {
    opacity: 1,
    fontSize: 14,
    fill: '#151515',
    fontWeight: 600,
    background: {
      padding: [3, 2, 3, 2],
      radius: 2,
      lineWidth: 3,
    },
  },
};

const defaultEdge = {
  labelCfg: {
    autoRotate: true,
    style: {
      ...edgeLabelCfgStyle.style,
      opacity: 0,
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
  },
  labelCfg: {
    style: {
      ...nodeLabelCfgStyle.style,
      opacity: 0,
    },
    offset: 10,
    position: 'bottom',
  },
  size: 40,
};

const nodeStateStyles = {
  selected: { ...defaultNode.style, fill: '' },
};

const edgeStateStyles = {
  selected: {
    color: '#414141',
    stroke: '#5a5a5a',
    shadowColor: 'none',
  },
};

export const options = {
  height: window.innerHeight - 165,
  width: window.innerWidth,
  fitCenter: true,
  fitView: true,
  animate: true,
  modes: {
    default: [
      'create-edge',
      'drag-canvas',
      'drag-node',
      'drag-combo',
      'zoom-canvas',
      {
        type: 'tooltip',
        formatText: (model: { [key: string]: unknown }) => {
          return renderTooltipModal(model);
        },
        offset: 10,
      },
      {
        type: 'brush-select',
        trigger: 'shift',
        includeEdges: false,
        brushStyle: {
          fill: '#000',
          stroke: '#FFF',
          lineWidth: 2,
          fillOpacity: 0.5,
        },
        resetSelected: false,
      },
    ],
  },
  grid: null,
  defaultEdge,
  defaultNode,
  nodeStateStyles,
  edgeStateStyles,
  animateCfg: {
    duration: 1000,
    easing: 'easeCubicInOut',
  },
};
