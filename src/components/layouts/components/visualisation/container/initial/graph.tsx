import { Graph } from '@antv/g6';
import { InitGraph } from '../../types';
import { initGraphEvents } from './events';
import { options } from '../../helpers/constants';
import { contextMenuPlugin } from '../../helpers/context-menu';

export const initGraph: InitGraph = (container, params) => {
  const graph = new Graph({
    container,
    ...options,
  });

  initGraphEvents(graph, params);

  graph.addPlugin(contextMenuPlugin(graph, params));

  return graph;
};
