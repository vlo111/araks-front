import { Graph } from '@antv/x6';
import { removeSelected, selectNode } from '../../helpers/selection';
import { changeTypePosition, getTypeColors, switchPermission, switchTypePermission } from '../../helpers/utils';
import { PATH, SELECTORS } from 'helpers/constants';
import { ElementStyle, InitEvents } from '../../types';

export const initSchemaEvents: InitEvents = (
  graph,
  { setAddPortModal, setSelectedNode, setAddTypeModal, setOpenLinkPropertyModal, setAddLinkModal }
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
        setAddPortModal({
          ...props,
          portId: 'add',
          isUpdate: false,
        });
      } else {
        /** Edit type property */
        setAddPortModal({
          ...props,
          portId: port as string,
          isUpdate: true,
        });
      }
    } else {
      setAddLinkModal({
        id: port,
      });
    }
  });

  graph.on('node:click', ({ x, y, e: { target }, node, view: { container } }) => {
    if (target.closest('.x6-port-body')) return;

    if (target.id === SELECTORS.NODE_SETTING_CIRCLE || target.id === SELECTORS.NODE_SETTING_ARROW_PATH) {
      setAddTypeModal([x, y]);
    }

    if (!container.classList.contains('selected-node')) {
      selectNode(graph, container, node);

      setSelectedNode(node);
    }
  });

  graph.on('edge:click', ({ edge, view: { container } }) => {
    const iconElement = container.querySelector('rect');

    if (iconElement !== null) {
      const { x, y, height, width } = iconElement.getBoundingClientRect();

      setOpenLinkPropertyModal({
        id: edge.id,
        name: edge.attr('name'),
        open: true,
        x: x + width / 2,
        y: y + height,
        color: getTypeColors(edge),
      });
    }
  });

  graph.on('blank:click', ({ x, y, e: { target } }) => {
    const selectedNode: ElementStyle = target.querySelector('.selected-node');

    if (selectedNode !== null) {
      removeSelected(graph, selectedNode);
      setSelectedNode(undefined);
    }

    if (graph.container.style.cursor === 'crosshair') setAddTypeModal([x, y]);
  });

  graph.on('node:mouseup', ({ node: { id }, x, y }) => changeTypePosition(id, x, y));
};

/**
 * The Events are provides perspective permission switchers
 * @param graph
 */
export const initPerspectiveEvents = (graph: Graph) => {
  graph.on('node:port:click', ({ node, port: portId }) => {
    const { eye, allow } = node.getPort(portId || '')?.attrs || {};

    /** return for edge property */
    if (eye === undefined) return;

    switchPermission(node, portId, allow as unknown as boolean);

    const ports = node.getPorts().find((g) => g.attrs?.eye && g.attrs.allow);

    switchTypePermission(node, !ports);
  });

  graph.on('node:click', ({ node, e: { target } }) => {
    if (target.closest('.x6-port-body')) return;

    const ports = node.getPorts().filter((g) => g.attrs?.eye);

    const isAllow = node?.attrs?.body.allow as boolean;

    switchTypePermission(node, isAllow);

    for (const { id } of ports) switchPermission(node, id, isAllow);
  });
};
