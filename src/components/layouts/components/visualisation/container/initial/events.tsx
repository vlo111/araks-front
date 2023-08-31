import { InitGraphEvents } from '../../types';
import { Edge, IEdge, IG6GraphEvent } from '@antv/g6';

export const initGraphEvents: InitGraphEvents = (graph, { startOpenNode, startOpenEdge, startOpenEdgeCreate }) => {
  let isDoubleClick = false;
  let processingAfterCreateEdge = false;
  let selected = false;

  const clearCanvas = () => {
    graph.setAutoPaint(false);
    graph.refreshPositions();
    graph.getNodes().forEach(function (node) {
      graph.clearItemStates(node);
    });
    graph.getEdges().forEach(function (edge) {
      graph.clearItemStates(edge);
    });
    graph.paint();
    graph.setAutoPaint(true);
  };

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

  graph.on('canvas:mousedown', (e: IG6GraphEvent) => {
    const isShift = (e.originalEvent as KeyboardEvent)?.shiftKey || false;
    if (isShift) selected = true;
    const isCombo = graph.getCombos();
    if (isCombo.length) {
      graph.uncombo(isCombo[0]._cfg?.id as string);
      graph.addBehaviors('drag-node', 'default');
      clearCanvas();
    }
  });

  graph.on('canvas:mouseup', (e) => {
    if (selected) {
      setTimeout(() => {
        if (e?.currentTarget?.cfg?.states?.selected?.length) {
          const nodes = e?.currentTarget?.cfg?.states?.selected;
          const ids = nodes.map((node: { _cfg: { id: string } }) => node._cfg.id);
          graph.createCombo(
            {
              id: 'combo-select',
              type: 'rect',
              style: {
                fill: 'rgb(178,178,178)',
                stroke: '#FFF',
                lineWidth: 2,
                fillOpacity: 0.2,
              },
            },
            ids
          );
          selected = false;
          graph.removeBehaviors('drag-node', 'default');
          graph.findAllByState('node', 'selected').forEach((node) => {
            graph.clearItemStates(node.getID(), 'selected');
          });
        }
      }, 0);
    }
  });
};
