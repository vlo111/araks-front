import { PickVisualizationContextType } from '../types';
import G6, { IG6GraphEvent } from '@antv/g6';

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

    startOpenNodeCreate({
      isOpened: false,
      x: evt?.x ?? 0,
      y: evt?.y ?? 0,
    });

    const nodeContext = `<div class="menu">
          <span>Focus on node</span>
          <span>Expand</span>
          <span class="delete">Delete</span>
        </div>`;

    const canvasContext = `<div class="menu">
          <span>Create Node</span>
        </div>`;

    const edgeContext = `<div class="menu">
          <span class="delete">Delete</span>
        </div>`;

    return isCanvas ? canvasContext : isNode ? nodeContext : edgeContext;
  };

  const contextMenu = new G6.Menu({
    getContent,
    handleMenuClick: (target, item) => {
      if (item?._cfg?.type === 'node') {
        if (target.className === 'delete') {
          startDeleteNode({
            id: item.getID(),
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
      } else {
        startOpenNodeCreate({ isOpened: true });
      }
    },
    offsetX: 16 + 10,
    offsetY: 0,
    itemTypes: ['node', 'edge', 'canvas'],
  });

  return contextMenu;
};
