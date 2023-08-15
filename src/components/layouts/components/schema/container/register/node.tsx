import { Graph } from '@antv/x6';
import { ArrowD } from '../../helpers/svg/path-d';
import { antTheme } from 'helpers/ant-theme';
import { SELECTORS } from '../../helpers/constants';

const { colorDefaultProperty, colorPropertyText, colorPropertyType } = antTheme.components.Schema;
const { NODE_SETTING_CIRCLE, NODE_SETTING_ARROW_PATH, PORT_EYE_PATH, PORT_NAME_TEXT, PORT_TYPE_TEXT, PORT_BODY_RECT } =
  SELECTORS;

export const LINE_HEIGHT = 30;

const NODE_WIDTH = 150;

const ports = {
  groups: {
    connector_select: {
      markup: [
        {
          tagName: 'rect',
          selector: 'link_rect',
        },
      ],
      attrs: {
        link_rect: {
          fill: 'none',
          width: 150,
          height: 10,
          strokeWidth: 2,
        },
      },
      position: {
        name: 'absolute',
      },
    },
    cell: {
      markup: [
        {
          tagName: 'rect',
          selector: PORT_BODY_RECT,
        },
        {
          tagName: 'text',
          selector: PORT_NAME_TEXT,
        },
        {
          tagName: 'text',
          selector: PORT_TYPE_TEXT,
        },
      ],
      attrs: {
        [PORT_BODY_RECT]: {
          width: NODE_WIDTH,
          height: LINE_HEIGHT,
          cursor: 'pointer',
          stroke: colorDefaultProperty,
          strokeDasharray: '150,250,219',
          strokeWidth: 6,
        },
        [PORT_NAME_TEXT]: {
          ref: PORT_BODY_RECT,
          cursor: 'pointer',
          refX: 6,
          refY: 10,
          fontSize: 10,
          fill: colorPropertyText,
          textWrap: {
            width: 90,
            ellipsis: true,
          },
        },
        [PORT_TYPE_TEXT]: {
          ref: PORT_BODY_RECT,
          cursor: 'pointer',
          refX: 95,
          refY: 10,
          fill: colorPropertyType,
          fontSize: 10,
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
          filter: 'drop-shadow(0 4px 4px rgb(0 0 0 / 0.6))',
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
};

const node = {
  inherit: 'rect',
  height: 40,
  width: NODE_WIDTH,
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
      selector: NODE_SETTING_CIRCLE,
    },
    {
      tagName: 'path',
      selector: NODE_SETTING_ARROW_PATH,
    },
    {
      tagName: 'path',
      selector: PORT_EYE_PATH,
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
      fill: colorPropertyText,
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
  ports,
};

Graph.registerNode('er-rect', node, true);
