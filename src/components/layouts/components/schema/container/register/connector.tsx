import { Graph, Path } from '@antv/x6';

Graph.registerConnector(
  'smooth',
  (source, target, a, b, e) => {
    const isMovingConnector = e.sourceMagnet?.getAttribute('port') === 'connector';

    const offsetPoint = isMovingConnector ? -2 : 7;

    const offsetX = source.x - target.x > 0 ? -offsetPoint : offsetPoint;

    const offset = 0;
    const deltaY = Math.abs(target.y - source.y);
    const control = Math.floor((deltaY / 3) * 2);

    let v1, v2;

    if (source.y - target.y > 0) {
      v1 = { x: source.x, y: source.y - offset - control };
      v2 = { x: target.x, y: target.y + offset + control };
    } else {
      v1 = {
        x: source.x,
        y: source.y + offset + control,
      };
      v2 = {
        x: target.x,
        y: target.y - offset - control,
      };
    }
    return Path.normalize(
      `M ${source.x + offsetX} ${source.y}
       L ${source.x} ${source.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${target.x} ${target.y - offset}
       L ${target.x - offsetX} ${target.y}
      `
    );
  },
  true
);
