import { BoundingEvent, INode, OnEdgeLabelRendered } from '../types';
import { createRoot } from 'react-dom/client';
import { EdgeSvg } from './svg/edge-svg';

const onEdgeLabel: OnEdgeLabelRendered = ({ edge, selectors }, openAddLinkPropertyModal, nodes) => {
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

      openAddLinkPropertyModal({
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
