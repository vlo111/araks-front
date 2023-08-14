import G6 from '@antv/g6';
import React from 'react';
import { HelpEdgeType, HelpNodeType } from '../type';

export const HelpChart = (
  graphData: { nodes: HelpNodeType[]; edges: HelpEdgeType[] },
  setNode: React.Dispatch<React.SetStateAction<string>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setGraph: React.Dispatch<React.SetStateAction<boolean>>,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const width = window.innerWidth / 2 - 10;
  const height = window.innerHeight - 10 || 720;
  const graph = new G6.Graph({
    width: width,
    height: height,
    container: 'aH7j3A9sa',
    fitCenter: true,
    renderer: 'canvas',
    defaultNode: {
      size: 40,
      style: {
        stroke: '',
        fill: '#414141',
      },
      labelCfg: {
        offset: 10,
        style: {
          fontSize: 20,
          color: '#414141',
          fontFamily: 'Rajdhani',
          fontWeight: 500,
          background: {
            fill: 'rgba(188,188,188,0.3)',
            padding: [6, 6, 6, 6],
            radius: 2,
          },
        },
        position: 'bottom',
      },
    },
    defaultEdge: {
      size: 2,
      color: '#808080',
    },
    modes: {
      default: ['drag-canvas', 'drag-node', { type: 'zoom-canvas', minZoom: 0.2, maxZoom: 2 }],
    },
  });

  graph.on('node:dblclick', (data) => {
    setEnabled(true);
    setNode(data.item?._cfg?.id as string);
    setOpen(true);
  });
  graph.data(graphData);

  graph.fitCenter();
  graph.render();
  setGraph(true);
};
