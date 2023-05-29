import { EyeClosedD, EyeD } from './svg/path-d';
import { COLORS } from 'helpers/constants';
import { antTheme } from 'helpers/ant-theme';

export const PATH = {
  NODE_COLOR: 'body/stroke',
  NODE_TEXT: 'text/text',
  EDGE_CREATOR: 'line/creator',
  EDGE_SOURCE_COLOR: 'line/stroke/stops/0/color',
  EDGE_TARGET_COLOR: 'line/stroke/stops/1/color',
  TYPE_D: 'eye/d',
  TYPE_ALLOW: 'allow',
  TYPE_NAME_FILL: 'text/fill',
  TYPE_EYE_FILL: 'eye/fill',
  TYPE_EYE_STROKE: 'eye/stroke',
  PROPERTY_ALLOW: 'attrs/allow',
  PROPERTY_D: 'attrs/eye/d',
  PROPERTY_EYE_FILL: 'attrs/eye/fill',
  PROPERTY_EYE_STROKE: 'attrs/eye/stroke',
  PROPERTY_NAME_FILL: 'attrs/portNameLabel/fill',
  PROPERTY_TYPE_FILL: 'attrs/portTypeLabel/fill',
  PROPERTY_REF_TYPE: 'attrs/ref_property_type_id',
};

export const SELECTORS = {
  PORT_BODY_RECT: 'portBody',
  PORT_NAME_TEXT: 'portNameLabel',
  PORT_TYPE_TEXT: 'portTypeLabel',
  PORT_EYE_PATH: 'eye',
  NODE_SETTING_CIRCLE: 'setting_circle',
  NODE_SETTING_ARROW_PATH: 'setting_path',
};

const {
  components: {
    Schema: { colorPerspectiveTextClose, colorPerspectiveIconClose },
  },
} = antTheme;

const {
  PRIMARY: { GRAY_DARK, GRAY },
} = COLORS;

export const openPropertyEye = {
  allow: true,
  [SELECTORS.PORT_EYE_PATH]: {
    d: EyeD,
    fill: GRAY,
  },
  [SELECTORS.PORT_NAME_TEXT]: { fill: GRAY_DARK },
  [SELECTORS.PORT_TYPE_TEXT]: { fill: GRAY_DARK },
};

export const closePropertyEye = {
  allow: false,
  [SELECTORS.PORT_EYE_PATH]: {
    d: EyeClosedD,
    fill: colorPerspectiveIconClose,
  },
  [SELECTORS.PORT_NAME_TEXT]: { fill: colorPerspectiveTextClose },
  [SELECTORS.PORT_TYPE_TEXT]: { fill: colorPerspectiveTextClose },
};

export const openTypeEye = {
  body: { allow: true },
  text: { fill: GRAY_DARK },
  [SELECTORS.PORT_EYE_PATH]: { d: EyeD, fill: GRAY },
};

export const closeTypeEye = {
  body: { allow: false },
  text: { fill: colorPerspectiveTextClose },
  [SELECTORS.PORT_EYE_PATH]: { d: EyeClosedD, fill: colorPerspectiveIconClose },
};
