import { AUTH_KEYS, DEFAULT_ICON } from './constants';
import { iconsList } from 'components/icon';
import { AxiosError } from 'axios';
import { Modal } from 'antd';
import { CustomError } from 'api/types';
import { PropertyTypes } from 'components/form/property/types';
import dayjs from 'dayjs';

export const noop = () => {
  return;
};

/** Checks if icon exists in our list */
export const checkIconInList = (iconName: string) => iconsList.includes(iconName);

export const getIconName = (iconName: string) => (checkIconInList(iconName) ? iconName : DEFAULT_ICON);

/** Get logged in user data from local storage */
export const logedInUser = localStorage.getItem(AUTH_KEYS.USER)
  ? JSON.parse(localStorage.getItem(AUTH_KEYS.USER) || '')
  : null;

export const stripTrailingSlash = (str: string) => {
  return str.endsWith('/') ? str.slice(0, -1) : str;
};

export const errorMessage = (er: unknown) => {
  Modal.error({
    title: 'Error',
    content: (er as AxiosError<CustomError>).response?.data.errors.message,
    footer: false,
    closable: true,
  });
};

export const convertByType = (value: unknown, type: PropertyTypes, addFromatForDate = false) => {
  switch (type) {
    case PropertyTypes.DateTime:
      if (addFromatForDate) {
        return dayjs(value as string).format('DD/MM/YYYY HH:mm');
      }
      return dayjs(value as string);
    case PropertyTypes.Date:
      if (addFromatForDate) {
        return dayjs(value as string).format('DD/MM/YYYY');
      }
      return dayjs(value as string);
    case PropertyTypes.Integer:
    case PropertyTypes.Decimal:
      return Number.isNaN(+(value as string)) ? +(value as string) : 0;
    default:
      return value;
  }
  return value;
};
