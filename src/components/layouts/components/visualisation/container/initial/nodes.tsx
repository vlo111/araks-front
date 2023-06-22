import { Edge, GraphData, InitNodes } from '../../types';
import G6 from '@antv/g6';

const initConnector: (edges: Edge[]) => void = (edges) => {
  const offsetDiff = 40;
  const multiEdgeType = 'quadratic';
  const singleEdgeType = 'line';
  const loopEdgeType = 'loop';

  G6.Util.processParallelEdges(edges, offsetDiff, multiEdgeType, singleEdgeType, loopEdgeType);
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const initData: InitNodes = (graph, data: GraphData) => {
  if (graph.data !== undefined) {
    graph.data(data);

    initConnector(data.edges);

    graph.render();
  }
};
