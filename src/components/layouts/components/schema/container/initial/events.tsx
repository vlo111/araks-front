import { Graph } from '@antv/x6';
import { removeSelected, selectNode } from '../../helpers/selection';
import {
  addTypePerspective,
  changeTypePosition,
  getTypeColors,
  removeTypePerspective,
  switchTypePermission,
} from '../../helpers/utils';
import { ElementStyle, InitEvents, InitPerspectiveEvents } from '../../types';
import { PATH, SELECTORS } from '../../helpers/constants';

export const initSchemaEvents: InitEvents = (
  graph,
  { startTypePort, setSelected, startType, startEdgePort, startEdgeType }
) => {
  graph.on('node:port:click', ({ node, port, view: { container } }) => {
    if (port === 'connector') return;

    const isEdge = node.getPortProp(port || '', PATH.PROPERTY_REF_TYPE) === 'connection';

    if (!isEdge) {
      const { x, y, height, width } = container.getBoundingClientRect();

      const props = {
        node: node,
        x: x + width,
        y: y + height - 30,
      };

      if (port === 'add') {
        startTypePort({
          ...props,
          portId: undefined,
          isUpdate: false,
        });
      } else {
        /** Edit type property */
        startTypePort({
          ...props,
          portId: port as string,
          isUpdate: true,
        });
      }
    } else {
      startEdgeType({ id: port, isUpdate: true });
    }
  });

  graph.on('node:click', ({ x, y, e: { target }, node, view: { container } }) => {
    if (target.closest('.x6-port-body')) return;

    if (target.id === SELECTORS.NODE_SETTING_CIRCLE || target.id === SELECTORS.NODE_SETTING_ARROW_PATH) {
      startType({ x, y });
    }

    if (!container.classList.contains('selected-node')) {
      selectNode(graph, container, node);

      setSelected({ node });
    }
  });

  graph.on('edge:click', ({ edge, view: { container } }) => {
    const iconElement = container.querySelector('rect');

    if (iconElement !== null) {
      const { x, y, height, width } = iconElement.getBoundingClientRect();

      startEdgePort({
        id: edge.id,
        name: edge.attr('name'),
        x: x + width / 2,
        y: y + height,
        color: getTypeColors(edge),
      });
    }
  });

  graph.on('blank:click', ({ x, y, e: { target } }) => {
    const selectedNode: ElementStyle = target.querySelector('.selected-node');

    if (selectedNode !== null) removeSelected(graph, selectedNode);

    setSelected({
      selected: false,
    });

    if (graph.container.style.cursor === 'crosshair') startType({ x, y });
  });

  /** update position */
  graph.on('node:mouseup', ({ node }) => changeTypePosition(node.id, node.position() || { x: 0, y: 0 }));
};

/**
 * The Events are provides perspective permission switchers
 * @param graph
 */
export const initPerspectiveEvents: InitPerspectiveEvents = (graph: Graph) => {
  graph.on('node:click', async ({ node, e: { target } }) => {
    if (target.closest('.x6-port-body')) return;

    const isAllow = node?.attrs?.body.allow as boolean;

    let response;

    if (!isAllow) {
      response = await addTypePerspective(node.id);
    } else {
      response = await removeTypePerspective(node.id);
    }

    if (response?.data) {
      switchTypePermission(node, isAllow);
    }
  });
};
