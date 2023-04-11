import { EdgeCreate, InitGraph } from '../../types';
import { antTheme } from '../../../../../../helpers/ant-theme';
import { Graph } from '@antv/x6';
import { Options } from '@antv/x6/lib/graph/options';

import Connecting = Options.Connecting;
import { initEvents } from './events';

export const initGraph: InitGraph = (container, _params) => {
  const connecting: Partial<Connecting> = {
    connector: 'smooth',
    router: {
      name: 'er',
      args: {
        offset: 'center',
        direction: 'H',
      },
    },
    validateEdge(item: EdgeCreate) {
      // eslint-disable-next-line no-console
      console.log(item);

      return false;
    },
    createEdge(item) {
      return this.createEdge({
        shape: 'er-edge',
        router: {
          name: 'normal',
        },
        attrs: {
          line: {
            sourceMarker: {
              name: 'path',
              d: '',
            },
            strokeDasharray: '5 5',
            stroke: item.sourceCell.attr('body/stroke'),
          },
        },
        zIndex: -1,
      });
    },
  };

  const grid = {
    size: 10,
    visible: true,
    type: 'doubleMesh',
    args: [
      {
        color: antTheme.components.Schema.colorGridThickness,
        thickness: 1,
      },
      {
        color: antTheme.components.Schema.colorGridLine,
        thickness: 2,
        factor: 10,
      },
    ],
  };

  const mousewheel = {
    enabled: true,
    zoomAtMousePosition: true,
    minScale: 0.5,
    maxScale: 3,
  };

  const options = {
    container: container,
    panning: true,
    height: window.innerHeight - 152,
    width: window.innerWidth - 300,
    background: { color: antTheme.components.Schema.colorBg },
    grid,
    mousewheel,
    connecting,
  };

  const graph = new Graph(options);

  initEvents(graph, _params);

  graph.zoomToFit({ padding: 10, maxScale: 1 });

  return graph;
};
