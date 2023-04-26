import { Graph, Markup } from '@antv/x6';

Graph.registerEdge(
  'er-edge',
  {
    inherit: 'edge',
    label: {
      name: 'circle',
      markup: Markup.getForeignObjectMarkup(),
      attrs: {
        fo: {
          height: 30,
          width: 30,
          x: -15,
          y: -13,
        },
      },
    },
    attrs: {
      line: {
        targetMarker: {
          name: 'circle',
        },
        sourceMarker: {
          name: 'circle',
        },
        strokeWidth: 2,
      },
    },
    zIndex: 0,
  },
  true
);
