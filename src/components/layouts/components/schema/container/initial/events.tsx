import { ElementStyle, InitEvents } from '../../types';
import { removeSelected, selectNode } from "../../helpers/utils";
import client from "../../../../../../api/client";
import { TYPE_POSITION_UPDATE_URL } from "../../../../../../api/schema/type/use-update-types-position";

export const initEvents: InitEvents = (graph, { setAddPortModal, setSelectedNode, setAddTypeModal }) => {
  graph.on('node:port:click', (event) => {
    if (event.port === 'connector') return;
    const { x, y, height, width } = event.view.container.getBoundingClientRect();

    const bottomX = x + width;
    const bottomY = y + height - 30;

    if (event.port === 'add') {
      setAddPortModal({
        node: event.node,
        portId: 'add',
        isUpdate: false,
        x: bottomX,
        y: bottomY,
      });
    } else {
      // edit
      setAddPortModal({
        node: event.node,
        portId: event.port as string,
        isUpdate: true,
        x: bottomX,
        y: bottomY,
      });
    }
  });

  graph.on('node:click', (event) => {
    const {
      view: { container },
      node,
    } = event;

    if (event.e.target.id === 'setting_circle' || event.e.target.id === 'setting_path') {
      setAddTypeModal([event.x, event.y]);
    }

    if (!container.classList.contains('selected-node')) {

      selectNode(graph, container, node)

      setSelectedNode(node);
    }
  });

  graph.on('blank:click', (event) => {
    const selectedNode: ElementStyle = event.e.target.querySelector('.selected-node');

    if (selectedNode !== null) {
      removeSelected(graph, selectedNode);
      setSelectedNode(undefined);
    }

    if (graph.container.style.cursor === 'crosshair') {
      setAddTypeModal([event.x, event.y]);
    }
  });

  graph.on('node:mouseup', (event) => {
    client.put(`${process.env.REACT_APP_BASE_URL}${TYPE_POSITION_UPDATE_URL.replace(':id', event.node.id)}`, {
      fx: event.x,
      fy: event.y
    })
  })
};

