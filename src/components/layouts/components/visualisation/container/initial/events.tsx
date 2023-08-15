import { InitGraphEvents } from '../../types';

export const initGraphEvents: InitGraphEvents = (graph, { startOpenNode }) => {
  graph.on('dblclick', (evt) => {
    startOpenNode({
      id: evt.item?.getID() ?? '',
    });
  });
};
