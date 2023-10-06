import { PickVisualizationContextType } from '../types';
import G6, { Graph, IG6GraphEvent } from '@antv/g6';
import { addTooltip, expand, expandByNodeData, getMenuContexts, removeTooltip, updateExpandList } from './utils';
import PluginBase from '@antv/g6-plugin/lib/base';

export const contextMenuPlugin: (graph: Graph, items: PickVisualizationContextType, isEdit: boolean) => PluginBase = (
  graph,
  { startOpenNodeCreate, startShortestPath, startDeleteNode, startDeleteEdge, setGraphInfo },
  isEdit
) => {
  const getContent = (evt: IG6GraphEvent | undefined) => {
    removeTooltip(graph);

    const target = evt?.target;
    const isCanvas = target?.isCanvas?.();
    const item = evt?.item;
    const itemType = item?._cfg?.type || '';
    const id = item?.getID() || '';
    const isNode = itemType === 'node';
    const isCombo = itemType === 'combo';

    startOpenNodeCreate({ isOpened: false, x: evt?.x ?? 0, y: evt?.y ?? 0 });

    const { canvasContext, nodeContext, comboContext, edgeContext } = getMenuContexts(id, isNode, isEdit);
    if (isNode) {
      updateExpandList(id, graph.getEdges());
    }

    return isCanvas ? canvasContext : isNode ? nodeContext : isCombo ? comboContext : edgeContext;
  };

  return new G6.Menu({
    getContent,
    handleMenuClick: async (target, item) => {
      const type = item?._cfg?.type || '';
      if (type === 'node') {
        const submenuClass = target.parentElement?.className;

        const isSubMenu = submenuClass === 'submenu' || submenuClass === 'right-section';

        if (isSubMenu) {
          await expand(graph, item, target, setGraphInfo);
          graph.fitView(0, { ratioRule: 'max', direction: 'both', onlyOutOfViewPort: true }, true);
        } else {
          switch (target.className) {
            case 'shortest-path': {
              startShortestPath({ id: item.getID() });
              break;
            }
            case 'delete': {
              startDeleteNode({ id: item.getID() });
              break;
            }
            case 'focus': {
              graph.clear();

              graph.addItem('node', item.getModel());

              await expandByNodeData(
                graph,
                item,
                item.getID(),
                (item.getModel() as { nodeType: string }).nodeType ?? '',
                'all',
                setGraphInfo
              );
              graph.fitView(0, { ratioRule: 'min', direction: 'both', onlyOutOfViewPort: false }, true);

              break;
            }
            default: // startOpenNode({ id: item.getID() });
          }
        }
      } else if (type === 'edge') {
        startDeleteEdge({ id: item.getID() });
      } else if (type === 'combo') {
        const nodesId = item?._cfg?.nodes?.map((node: { _cfg: { id: string } }) => node._cfg.id) || [];
        if (target.className === 'delete') startDeleteNode({ id: undefined, ids: nodesId });
      } else {
        if (target?.className === 'export') {
          graph.downloadFullImage('default_graph', 'image/png', {
            backgroundColor: '#F2F2F2',
          });
        } else {
          startOpenNodeCreate({ isOpened: true });
        }
      }

      addTooltip(graph);
    },
    offsetX: 16 + 10,
    offsetY: 0,
    itemTypes: ['node', 'edge', 'canvas', 'combo'],
  });
};
