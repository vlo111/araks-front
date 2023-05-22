import { PATH } from '../../../../../helpers/constants';
import { EyeClosedD, EyeD } from './svg/path-d';

export const openEye = [
  {
    path: PATH.PROPERTY_ALLOW,
    value: true,
  },
  {
    path: PATH.PROPERTY_NAME,
    value: '#414141',
  },
  {
    path: PATH.PROPERTY_TYPE,
    value: '#414141',
  },
  {
    path: PATH.PROPERTY_D,
    value: EyeD,
  },
  {
    path: PATH.PROPERTY_EYE_FILL,
    value: '#808080',
  },
];

export const closeEye = [
  {
    path: PATH.PROPERTY_ALLOW,
    value: false,
  },
  {
    path: PATH.PROPERTY_NAME,
    value: '#999999',
  },
  {
    path: PATH.PROPERTY_TYPE,
    value: '#999999',
  },
  {
    path: PATH.PROPERTY_D,
    value: EyeClosedD,
  },
  {
    path: PATH.PROPERTY_EYE_FILL,
    value: '#C6C6C6',
  },
];
