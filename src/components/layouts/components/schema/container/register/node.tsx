import { Graph } from '@antv/x6';
import { ArrowD } from '../../helpers/svg/path-d';

export const LINE_HEIGHT = 30;

const NODE_WIDTH = 150;

Graph.registerNode(
  'er-rect',
  {
    inherit: 'rect',
    height: 40,
    width: 150,
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'text',
        selector: 'text',
      },
      {
        tagName: 'circle',
        selector: 'setting_circle',
      },
      {
        tagName: 'path',
        selector: 'setting_path',
      },
    ],
    attrs: {
      label: {
        fontSize: 14,
        textAnchor: 'left',
        refX: 20,
        cursor: 'default',
        textWrap: {
          width: 10,
          height: 16,
          ellipsis: true,
        },
      },
      body: {
        strokeWidth: 6,
        fill: '#F5F5F5',
        zIndex: 1,
        strokeDasharray: '150,250,219',
        filter: 'drop-shadow(0 4px 4px rgb(0 0 0 / 0.1))',
      },
      text: {
        fontFamily: 'Rajdhani',
        fontWeight: 600,
        fill: '#414141',
        fontSize: 12,
        refX: 6,
        refX2: 0,
        textAnchor: 'start',
        textVerticalAnchor: 'middle',
        zIndex: 2,
        cursor: 'default',
        textWrap: {
          width: 100,
          ellipsis: true,
        },
      },
    },
    ports: {
      groups: {
        cell: {
          markup: [
            {
              tagName: 'rect',
              selector: 'portBody',
            },
            {
              tagName: 'text',
              selector: 'portNameLabel',
            },
            {
              tagName: 'text',
              selector: 'portTypeLabel',
            },
            {
              tagName: 'path',
              selector: 'eye',
            },
            {
              tagName: 'path',
              selector: 'eye_point',
            },
          ],
          attrs: {
            portBody: {
              width: NODE_WIDTH,
              height: LINE_HEIGHT,
              cursor: 'pointer',
              stroke: '#F2F2F2',
              strokeDasharray: '150,250,219',
              strokeWidth: 6,
            },
            portNameLabel: {
              ref: 'portBody',
              cursor: 'pointer',
              refX: 6,
              refY: 10,
              fontSize: 10,
              textWrap: {
                width: 90,
                ellipsis: true,
              },
            },
            portTypeLabel: {
              ref: 'portBody',
              cursor: 'pointer',
              refX: 95,
              refY: 5,
              fill: '#808080',
              fontSize: 10,
            },
            eye: {
              refX: 125,
              refY: 5,
              fill: '#808080',
              stroke: '#808080',

            },
            eye_point: {
              refX: 125,
              refY: 5,
              fill: '#808080',
              stroke: '#808080',
            },
          },
          position: 'erPortPosition',
        },
        connector: {
          markup: [
            {
              tagName: 'g',
              selector: 'group',
              children: [
                {
                  tagName: 'circle',
                  selector: 'link_circle',
                },
                {
                  tagName: 'rect',
                  selector: 'link_rect',
                },
                {
                  tagName: 'path',
                  selector: 'link_path',
                },
              ],
            },
          ],
          attrs: {
            link_rect: {
              fill: 'none',
              width: 150,
              height: 10,
              strokeWidth: 2,
            },
            link_circle: {
              r: 16,
              magnet: true,
              strokeWidth: 2,
            },
            link_path: {
              stroke: 'white',
              magnet: true,
              fill: 'white',
              d: ArrowD,
            },
          },
          position: {
            name: 'absolute',
          },
        },
      },
    },
  },
  true
);
