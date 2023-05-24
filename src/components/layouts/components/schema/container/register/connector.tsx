import { Graph, Path } from '@antv/x6';

Graph.registerConnector(
  'smooth',
  (source, target, a, b, e) => {
    if (e.sourceView?.cell.id === e.targetView?.cell.id) {
      const targetX = target.x - 82;

      const control = Math.floor((Math.abs(target.y - source.y + 40) / 4) * 4);

      return Path.normalize(
        `M ${source.x - 5} ${source.y}
       L ${source.x} ${source.y}
       C ${source.x - control} ${source.y} ${targetX - control} ${target.y} ${targetX} ${target.y}
       L ${targetX} ${target.y}
      `
      );
    } else {
      const sourcePort = e.sourceMagnet?.getAttribute('port');
      const targetPort = e.targetMagnet?.getAttribute('port');

      const isMovingConnector = sourcePort === 'connector';

      let targetX = target.x;

      /**
       * Magnet point position when
       * Type connection without port id
       * */
      if (targetPort === undefined && !isMovingConnector) {
        targetX = source.x - targetX > 0 ? target.x + 75 : target.x - 75;
      }

      const offsetPoint = isMovingConnector ? -2 : 7;

      const offsetX = source.x - targetX > 0 ? -offsetPoint : offsetPoint;

      const offset = 0;
      const deltaY = Math.abs(target.y - source.y);
      const control = Math.floor((deltaY / 3) * 2);

      let v1, v2;

      if (source.y - target.y > 0) {
        v1 = { x: source.x, y: source.y - offset - control };
        v2 = { x: targetX, y: target.y + offset + control };
      } else {
        v1 = {
          x: source.x,
          y: source.y + offset + control,
        };
        v2 = {
          x: targetX,
          y: target.y - offset - control,
        };
      }

      return Path.normalize(
        `M ${source.x + offsetX} ${source.y}
       L ${source.x} ${source.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${targetX} ${target.y - offset}
       L ${targetX - offsetX} ${target.y}
      `
      );
    }
  },
  true
);
