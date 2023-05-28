import { Graph } from '@antv/x6';
import { Highlighter } from '../../types';
import { PATH } from '../../helpers/constants';

export const outline: Highlighter = {
  highlight(cellView) {
    if (!cellView.container.classList.contains('selected-node')) {
      cellView.setStyle({
        outline: `2px solid ${cellView.cell.attr(PATH.NODE_COLOR)}`,
        outlineOffset: '-5px',
      });
    }
  },
  unhighlight(cellView) {
    cellView.setStyle({
      outline: '0',
    });
  },
};

Graph.registerHighlighter('stroke', outline, true);
