import { Graph } from '@antv/g6';
import { InitGraph } from '../../types';
import { initGraphEvents } from './events';
import { options } from '../../helpers/init-graph-data';
import { contextMenuPlugin } from '../../helpers/context-menu';

export const initGraph: InitGraph = (container, params) => {
  const graph = new Graph({
    container,
    plugins: [contextMenuPlugin(params)],
    ...options,
  });

  initGraphEvents(graph, params);

  return graph;
};
