import { PickVisualizationContextType } from '../types';
import G6, { IG6GraphEvent } from '@antv/g6';
import { formattedData } from './format-node';
import { getExpandData, getMenuContexts } from './utils';

export const contextMenuPlugin: (items: PickVisualizationContextType) => void = ({
  startOpenNodeCreate,
  startOpenNode,
  startDeleteNode,
  startDeleteEdge,
}) => {
  const getContent = (evt: IG6GraphEvent | undefined) => {
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
          const expandData = await getExpandData((item._cfg.model as { id: string })?.id ?? '', target.id);

          const graphData = formattedData(expandData.nodes, expandData.edges);

          localStorage.setItem('expand', JSON.stringify(graphData));
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
    },
    offsetX: 16 + 10,
    offsetY: 0,
    itemTypes: ['node', 'edge', 'canvas', 'combo'],
  });

  return contextMenu;
};
