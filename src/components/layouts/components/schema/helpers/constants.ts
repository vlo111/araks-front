import { EyeClosedD, EyeD } from './svg/path-d';
import { COLORS, SELECTORS } from 'helpers/constants';
import { antTheme } from 'helpers/ant-theme';

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
