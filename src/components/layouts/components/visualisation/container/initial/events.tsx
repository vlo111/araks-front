import { InitGraphEvents } from '../../types';
import { Edge } from '@antv/g6';

export const initGraphEvents: InitGraphEvents = (graph, { startOpenNode, startOpenEdge }) => {
  graph.on('dblclick', (evt) => {
    startOpenNode({
      id: evt.item?.getID() ?? '',
    });
  });

  graph.on('aftercreateedge', ({ edge }: { edge: Edge }) => {
    startOpenEdge({
      edge,
    });
  });
};
