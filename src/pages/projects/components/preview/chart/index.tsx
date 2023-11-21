import G6, { Graph } from '@antv/g6';
import { PreviewEdgeType, PreviewGraphType } from '../type';

export const PreviewChart = (container: HTMLDivElement) => {
  const width = window.innerWidth / 2 - 10;
  const height = window.innerHeight - 250 || 720;

  const graph = new G6.Graph({
    container,
    width: width,
    height: height,
    fitView: true,
    renderer: 'canvas',
    layout: {
      type: 'grid',
      minNodeSpacing: 100,
      preventOverlap: true,
      sortBy: 'degree',
      nodeSize: 60,
      sweep: Math.PI,
    },
    animate: true,
    defaultNode: {
      type: 'preview-node',
      size: 60,
      style: {
        stroke: '#232F6A',
        lineWidth: 8,
        fill: '#E0E0E0',
      },
      labelCfg: {
        offset: 10,
        style: {
          fontSize: 25,
          color: '#414141',
          fontFamily: 'Rajdhani',
          fontWeight: 500,
        },
        position: 'bottom',
      },
    },
    defaultEdge: {
      size: 2,
      color: '#C3C3C3',
      labelCfg: {
        refY: 10,
        autoRotate: true,
        style: {
          fontSize: 20,
        },
      },
      style: {
        endArrow: {
          fill: '#C3C3C3',
          path: G6.Arrow.triangle(),
        },
      },
    },
    modes: {
      default: ['drag-canvas', 'drag-node', { type: 'zoom-canvas', minZoom: 0.5, maxZoom: 1.5 }],
    },
  });

  return {
    destroy: () => graph.destroy(),
    graph,
  };
};

export const initPreviewChartData = ({ graph, nodes, edges }: PreviewGraphType & { graph: Graph }) => {
  initConnector(edges);

  graph.data({ nodes, edges: edges?.length ? edges : [] });
  graph.fitCenter();
  graph.render();
};

const initConnector = (edges: PreviewEdgeType[] | null) => {
  const offsetDiff = 60;
  const multiEdgeType = 'quadratic';
  const singleEdgeType = 'line';
  const loopEdgeType = 'loop';
  G6.Util.processParallelEdges(edges, offsetDiff, multiEdgeType, singleEdgeType, loopEdgeType);

  G6.registerNode(
    'preview-node',
    {
      draw(cfg, group) {
        const rect = group.addShape('circle', {
          attrs: {
            x: 0,
            y: 0,
            r: 30,
            stroke: cfg.color,
            lineWidth: 8,
            fill: '#E0E0E0',
            radius: 12,
          },
          draggable: true,
          name: 'rect-intention',
        });
        group.addShape('text', {
          attrs: {
            x: 0,
            y: 10,
            text: cfg.nodesCount,
            fontSize: 18,
            fill: '#000',
            fontFamily: 'Rajdhani',
            fontWeight: 500,
            textAlign: 'center',
          },
          draggable: true,
          name: 'rect-title',
        });
        group.addShape('text', {
          attrs: {
            x: 0,
            y: 60,
            text: cfg.name,
            fontSize: 20,
            color: '#414141',
            fontFamily: 'Rajdhani',
            fontWeight: 500,
            fill: '#000',
            textAlign: 'center',
          },
          name: 'rect-title',
        });
        return rect;
      },
    },
    'single-node'
  );
};
