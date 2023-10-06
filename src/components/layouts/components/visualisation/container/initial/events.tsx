import { InitGraphEvents } from '../../types';
import { Edge, IG6GraphEvent } from '@antv/g6';
import { addTooltip, clearCanvas, removeFakeEdge } from '../../helpers/utils';

export const initGraphEvents: InitGraphEvents = (graph, { startOpenNode, startOpenEdge, startOpenEdgeCreate }) => {
  let isDoubleClick = false;
  let processingAfterCreateEdge = false;
  let selected = false;

  graph.on('node:dblclick', (evt) => {
    isDoubleClick = true;

    startOpenNode({
      id: evt.item?.getID(),
    });

    removeFakeEdge(graph);

    setTimeout(() => {
      isDoubleClick = false;
    }, 300);
  });

  graph.on('edge:dblclick', (evt) => {
    startOpenEdge({ id: evt.item?.getID() });
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

    const comboSelect = graph.getCombos().find((c) => c.getID() === 'combo-select');

    if (comboSelect) {
      graph.uncombo(comboSelect.getID() as string);
      graph.addBehaviors(['drag-node', 'create-edge'], 'default');
      clearCanvas(graph);
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
          graph.removeBehaviors(['drag-node', 'create-edge'], 'default');
          graph.findAllByState('node', 'selected').forEach((node) => {
            graph.clearItemStates(node.getID(), 'selected');
          });
        }
      }, 0);
    }
  });

  graph.on('canvas:click', (e) => {
    addTooltip(graph);

    return true;
  });
};
