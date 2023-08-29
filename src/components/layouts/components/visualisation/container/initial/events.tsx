import { InitGraphEvents } from '../../types';
import { Edge, IEdge } from '@antv/g6';

export const initGraphEvents: InitGraphEvents = (graph, { startOpenNode, startOpenEdge, startOpenEdgeCreate }) => {
  let isDoubleClick = false;
  let processingAfterCreateEdge = false;

  const removeFakeEdge = () => {
    const edges = graph.getEdges();
    const fake_edge: IEdge = edges[edges.length - 1];
    graph.removeItem(fake_edge?.getID());
  };

  graph.on('dblclick', (evt) => {
    if (evt.item?.getType() === 'edge') {
      startOpenEdge({
        id: evt.item.getID(),
      });
    } else if (evt.item?.getType() === 'node') {
      isDoubleClick = true;
      startOpenNode({
        id: evt.item?.getID() ?? '',
      });

      removeFakeEdge();

      setTimeout(() => {
        isDoubleClick = false;
      }, 300);
    }
  });

  graph.on('aftercreateedge', ({ edge }: { edge: Edge }) => {
    processingAfterCreateEdge = true;
    setTimeout(() => {
      if (!isDoubleClick && processingAfterCreateEdge) {
        startOpenEdgeCreate({
          edge,
        });
      }
      processingAfterCreateEdge = false;
    }, 100);
  });
};
