import { Graph, Markup, Path } from '@antv/x6';
import { ArrowD } from './svg/path-d';

export const LINE_HEIGHT = 30;
const NODE_WIDTH = 150;

Graph.registerPortLayout(
  'erPortPosition',
  (portsPositionArgs) => {
    return portsPositionArgs.map((_, index) => {
      return {
        position: {
          x: 0,
          y: index === 0 ? (index + 1) * 40 : (index + 1) * LINE_HEIGHT + 10 // * 1.1
        },
        angle: 0
      };
    });
  },
  true
);

Graph.registerNode(
  'er-rect',
  {
    inherit: 'rect',
    height: 40,
    width: 150,
    attrs: {
      rect: {
        strokeWidth: 6,
        fill: '#F5F5F5',
        // filter: {
        //   name: 'dropShadow',
        //   args: {
        //     dx: 0,
        //     dy: 4
        //     // blur: 40
        //     // color: 'red',
        //     // opacity: 0
        //   }
        // },
        zIndex: 1,
        strokeDasharray: '150,250,219',
        filter: 'drop-shadow(0 4px 4px rgb(0 0 0 / 0.1))'
      },
      label: {
        fontWeight: '600',
        fill: '#414141',
        fontSize: 12,
        refX: 6,
        refX2: 0,
        textAnchor: 'start',
        textVerticalAnchor: 'middle'
      }
    },
    ports: {
      groups: {
        cell: {
          markup: [
            {
              tagName: 'rect',
              selector: 'portBody'
            },
            {
              tagName: 'text',
              selector: 'portNameLabel'
            },
            {
              tagName: 'text',
              selector: 'portTypeLabel'
            }
          ],
          attrs: {
            portBody: {
              width: NODE_WIDTH,
              height: LINE_HEIGHT,
              cursor: 'pointer',
              stroke: '#F2F2F2',
              strokeDasharray: '150,250,219',
              strokeWidth: 6
            },
            portNameLabel: {
              ref: 'portBody',
              cursor: 'pointer',
              refX: 6,
              refY: 10,
              fontSize: 10
            },
            portTypeLabel: {
              ref: 'portBody',
              cursor: 'pointer',
              refX: 95,
              refY: 10,
              fill: '#808080',
              fontSize: 10
            }
          },
          position: 'erPortPosition'
        },
        connector: {
          markup: [
            {
              tagName: 'g',
              selector: 'group',
              children: [
                {
                  tagName: 'circle',
                  selector: 'link_circle'
                },
                {
                  tagName: 'rect',
                  selector: 'link_rect'
                },
                {
                  tagName: 'path',
                  selector: 'link_path'
                }
              ]
            }
          ],
          attrs: {
            link_rect: {
              fill: 'none',
              width: 150,
              height: 10,
              magnet: true,
              strokeWidth: 2
            },
            link_circle: {
              r: 16,
              magnet: true,
              strokeWidth: 2
            },
            link_path: {
              stroke: 'white',
              magnet: true,
              fill: 'white',
              d: ArrowD
            }
          },
          position: {
            name: 'absolute'
          }
        }
      }
    }
  },
  true
);

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
          y: -13
        }
      }
    },
    attrs: {
      line: {
        targetMarker: {
          name: 'circle'
        },
        sourceMarker: {
          name: 'circle'
        }
      }
    },
    zIndex: 0
  },
  true
);

Graph.registerConnector(
  'smooth',
  (source, target, a, b, e) => {
    const isMovingConnector =
      e.sourceMagnet?.getAttribute('port') === 'connector';

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
        y: source.y + offset + control
      };
      v2 = {
        x: target.x,
        y: target.y - offset - control
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
