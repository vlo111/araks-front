import { createRoot } from 'react-dom/client';
import { Node } from '@antv/x6';
import { BoundingEvent, InitNodes, INode, OnEdgeLabelRendered } from '../../types';
import { EdgeSvg } from '../../helpers/svg/edge-svg';
import { selectNode } from "../../helpers/utils";

const onEdgeLabel: OnEdgeLabelRendered = ({ edge, selectors }, setOpenLinkPropertyModal, nodes) => {
  /** This label is svg foreign object that is rendered on chart as edge property icon */
  const label = selectors['foContent'] as HTMLDivElement;

  if (label !== undefined) {
    label.style.display = 'flex';
    label.style.alignItems = 'center';
    label.style.justifyContent = 'center';

    label.onmouseenter = (e: MouseEvent) => {
      (e as MouseEvent & { target: { style: { cursor: string } } }).target.style.cursor = 'pointer';
    };

    label.onmouseleave = (e) => {
      (e as MouseEvent & { target: { style: { cursor: string } } }).target.style.cursor = 'auto';
    };

    label.addEventListener('click', (e) => {
      const colors: Array<{ color: string }> = edge.attr('line/stroke/stops');

      const target = e.target as BoundingEvent;

      const bounding = target?.tagName === 'path' ? target.previousElementSibling.firstChild : target;

      const { x, y, height, width } = bounding?.getBoundingClientRect();

      setOpenLinkPropertyModal({
        x: x + width / 2,
        y: y + height,
        color: colors.map((s: { color: string }) => s.color),
      });
    });

    const stroke = nodes?.find((d: INode) => d.id === edge.id)?.attrs.line?.stroke;

    if (stroke !== undefined) {
      const root = createRoot(label);

      root.render(<EdgeSvg id={edge.id} stroke={stroke} />);
    }
  }
};

export const initNodes: InitNodes = (graph, cells, { setOpenLinkPropertyModal, selectedNode, setSelectedNode }) => {
  if (cells.length > 0) {
    graph.options.onEdgeLabelRendered = (args) => onEdgeLabel(args, setOpenLinkPropertyModal, []);

    graph.resetCells(cells);
  }

  /** The Type need to be selected after create a type */
  /** Set Select Type the last created type */
  if (typeof selectedNode === 'string') {
    setTimeout(() => {
      const container: Element = Array.from(graph.view.stage.childNodes).find(
        (n) =>
          (n as ChildNode & { getAttribute: (item: string) => string }).getAttribute('data-cell-id') === selectedNode
      ) as Element;

      const node = graph.getNodes().find((n) => n.id === selectedNode) as Node<Node.Properties>;

      selectNode(graph, container, node);

      setSelectedNode(node);
    }, 100);
  }
};
