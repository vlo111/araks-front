import { Edge, InitNodes } from '../../types';
import G6 from '@antv/g6';

const initConnector: (edges: Edge[]) => void = (edges) => {
  const offsetDiff = 40;
  const multiEdgeType = 'quadratic';
  const singleEdgeType = 'line';
  const loopEdgeType = 'loop';

  G6.Util.processParallelEdges(edges, offsetDiff, multiEdgeType, singleEdgeType, loopEdgeType);
};

export const initData: InitNodes = (graph, data) => {
  if (graph.data !== undefined) {
    graph.data(data);

    initConnector(data.edges);
  }
};
