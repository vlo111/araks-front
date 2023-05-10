import { createRoot } from 'react-dom/client';
import { Node } from '@antv/x6';
import { BoundingEvent, InitNodes, OnEdgeLabelRendered } from '../../types';
import { EdgeSvg } from '../../helpers/svg/edge-svg';
import { getTypeColors, selectNode } from '../../helpers/utils';
import { PATH } from 'helpers/constants';

const onEdgeLabel: OnEdgeLabelRendered = ({ edge, selectors }, setOpenLinkPropertyModal, nodes) => {
  if (!edge.attr(PATH.EDGE_CREATOR)) {
    /** This label is svg foreign object that is rendered on chart as edge property icon */
    const label = selectors['foContent'] as HTMLDivElement;

    if (label !== undefined) {
      label.style.display = 'flex';
      label.style.alignItems = 'center';
      label.style.justifyContent = 'center';
      label.setAttribute('title', edge.attr('name'));

      label.onmouseenter = (e: MouseEvent) => {
        (e as MouseEvent & { target: { style: { cursor: string } } }).target.style.cursor = 'pointer';
      };

      label.onmouseleave = (e) => {
        (e as MouseEvent & { target: { style: { cursor: string } } }).target.style.cursor = 'auto';
      };

      label.addEventListener('click', (e) => {
        const target = e.target as BoundingEvent;

        const bounding = target?.tagName === 'path' ? target.previousElementSibling.firstChild : target;

        const { x, y, height, width } = bounding?.getBoundingClientRect();

        setOpenLinkPropertyModal({
          id: edge.id,
          name: edge.attr('name'),
          open: true,
          x: x + width / 2,
          y: y + height,
          color: getTypeColors(edge),
        });
      });

      const root = createRoot(label);

      root.render(<EdgeSvg id={edge.id} stroke={getTypeColors(edge)} />);
    }
  }
};

export const initNodes: InitNodes = (graph, cells, { setOpenLinkPropertyModal, selectedNode, setSelectedNode }) => {
  if (cells.length > 0) {
    graph.resetCells(cells);

    graph.options.onEdgeLabelRendered = (args) => onEdgeLabel(args, setOpenLinkPropertyModal, graph.getNodes());

    graph.zoomToFit({ padding: 10, maxScale: 1 });
  }

  /** The Type need to be selected after create a type */
  /** Set Select Type the last created type */
  if (typeof selectedNode === 'string') {
    setTimeout(() => {
      const nodes = graph.view.stage.querySelectorAll('.x6-cell.x6-node');

      const container: Element = Array.from(nodes).find(
        (n) =>
          (n as ChildNode & { getAttribute: (item: string) => string }).getAttribute('data-cell-id') === selectedNode
      ) as Element;

      const node = graph.getNodes().find((n) => n.id === selectedNode) as Node<Node.Properties>;

      selectNode(graph, container, node);

      setSelectedNode(node);
    }, 100);
  }
};
