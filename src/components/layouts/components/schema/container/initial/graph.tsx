import { InitGraph } from '../../types';
import { antTheme } from 'helpers/ant-theme';
import { Graph } from '@antv/x6';
import { Options } from '@antv/x6/lib/graph/options';
import { Snapline } from '@antv/x6-plugin-snapline';

import Connecting = Options.Connecting;
import { initEvents } from './events';
import { PATH } from 'helpers/constants';
import { isPerspective } from '../../helpers/utils';

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
    createEdge(item) {
      return this.createEdge({
        shape: 'er-edge',
        router: {
          name: 'normal',
        },
        attrs: {
          line: {
            creator: true,
            sourceMarker: {
              name: 'path',
              d: '',
            },
            strokeDasharray: '5 5',
            stroke: item.sourceCell.attr(PATH.NODE_COLOR),
          },
        },
        zIndex: -1,
      });
    },
    validateEdge: ({ edge: { source, target } }) => {
      if ('cell' in source && 'cell' in target) {
        _params.setAddLinkModal({
          source: source.cell as string,
          target: target.cell as string,
        });
      }
      return false;
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
    width: isPerspective() ? window.innerWidth - 600 : window.innerWidth - 300,
    background: { color: antTheme.components.Schema.colorBg },
    grid,
    mousewheel,
    connecting,
  };

  const graph = new Graph(options);

  if (!isPerspective()) {
    initEvents(graph, _params);
  }

  graph.use(
    new Snapline({
      enabled: true,
      sharp: true,
      tolerance: 20,
    })
  );

  return graph;
};
