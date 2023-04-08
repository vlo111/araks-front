import { Graph } from '@antv/x6';
import { LINE_HEIGHT } from './node';

Graph.registerPortLayout(
  'erPortPosition',
  (portsPositionArgs) => {
    return portsPositionArgs.map((_, index) => {
      return {
        position: {
          x: 0,
          y: index === 0 ? (index + 1) * 40 : (index + 1) * LINE_HEIGHT + 10, // * 1.1
        },
        angle: 0,
      };
    });
  },
  true
);
