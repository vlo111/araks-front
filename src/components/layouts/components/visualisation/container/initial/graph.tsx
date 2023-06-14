import { Graph } from '@antv/g6';
import { InitGraph } from '../../types';

export const initGraph: InitGraph = (container, _params) => {

  return new Graph({
    container: container,
    height: window.innerHeight - 152,
    width: window.innerWidth - 300,
  });
};
