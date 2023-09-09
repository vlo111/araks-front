import { PickVisualizationContextType } from '../types';
import G6, { Graph, IG6GraphEvent } from '@antv/g6';
import { formattedData } from './format-node';
import { addTooltip, getExpandData, getMenuContexts, removeTooltip, updateExpandList } from './utils';
import PluginBase from '@antv/g6-plugin/lib/base';

export const contextMenuPlugin: (graph: Graph, items: PickVisualizationContextType) => PluginBase = (
  graph,
  { startOpenNodeCreate, startOpenNode, startDeleteNode, startDeleteEdge }
) => {
  const getContent = (evt: IG6GraphEvent | undefined) => {
    removeTooltip(graph);

    const target = evt?.target;

    const isCanvas = target && target.isCanvas && target.isCanvas();

    const isNode = evt?.item?.getType() === 'node';

    const isCombo = evt?.item?.getType() === 'combo';

    startOpenNodeCreate({
      isOpened: false,
      x: evt?.x ?? 0,
      y: evt?.y ?? 0,
    });

    const { canvasContext, nodeContext, comboContext, edgeContext } = getMenuContexts(evt?.item?.getID() ?? '', isNode);

    updateExpandList(evt?.item?.getID() ?? '', graph.getEdges());

    return isCanvas ? canvasContext : isNode ? nodeContext : isCombo ? comboContext : edgeContext;
  };

  const contextMenu = new G6.Menu({
    getContent,
    handleMenuClick: async (target, item) => {
      if (item?._cfg?.type === 'node') {
        if (target.className === 'delete') {
          startDeleteNode({
            id: item.getID(),
          });
        } else if (target.parentElement?.className === 'submenu') {
          const direction = target.firstElementChild?.className ?? '';

          const id = (item._cfg.model as { id: string })?.id ?? '';

          const expandData = await getExpandData(id, target.id, direction);

          const graphData = formattedData(expandData.nodes, expandData.edges);

          const radius = 200;

          graphData.nodes.forEach((n, index) => {
            graph.addItem('node', {
              ...n,
              x: (item?._cfg?.model?.x ?? 0) + radius * Math.sin((Math.PI * 2 * index) / graphData.nodes.length),
              y: (item?._cfg?.model?.y ?? 0) - radius * Math.cos((Math.PI * 2 * index) / graphData.nodes.length),
            });
          });

          graphData.edges.forEach((e) => {
            graph.addItem('edge', e);
          });
        } else {
          startOpenNode({
            id: item.getID(),
          });
        }
      } else if (item?._cfg?.type === 'edge') {
        startDeleteEdge({
          id: item.getID(),
        });
      } else if (item?._cfg?.type === 'combo') {
        const nodesId = item?._cfg.nodes.map((node: { _cfg: { id: string } }) => node._cfg.id);
        if (target.className === 'delete') {
          startDeleteNode({
            ids: nodesId,
          });
        }
      } else {
        startOpenNodeCreate({ isOpened: true });
      }

      addTooltip(graph);
    },
    offsetX: 16 + 10,
    offsetY: 0,
    itemTypes: ['node', 'edge', 'canvas', 'combo'],
  });

  return contextMenu;
};
