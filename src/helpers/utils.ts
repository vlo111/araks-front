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
    content: (er as AxiosError<CustomError>).response?.data.errors.message || 'Something happened, please try later',
    footer: false,
    closable: true,
  });
};

export const convertByType = (value: unknown[], type: PropertyTypes, addFromatForDate = false) => {
  switch (type) {
    case PropertyTypes.DateTime:
      if (addFromatForDate) {
        return dayjs(value[0] as string).format('DD/MM/YYYY HH:mm');
      }
      return dayjs(value[0] as string);
    case PropertyTypes.Date:
      if (!value || !(value as unknown[]).filter(Boolean).length) {
        return '';
      }
      if (addFromatForDate) {
        return dayjs(value[0] as string).format('DD/MM/YYYY');
      }
      return dayjs(value[0] as string);
    case PropertyTypes.Integer:
    case PropertyTypes.Decimal:
    default:
      return value[0];
  }
};

function getColumnLetter(columnNumber: number): string {
  let columnLetter = '';

  while (columnNumber > 0) {
    const remainder = (columnNumber - 1) % 26;
    columnLetter = String.fromCharCode(65 + remainder) + columnLetter;
    columnNumber = Math.floor((columnNumber - 1) / 26);
  }

  return columnLetter;
}

export function getExcelColumnNames(startColumn: number, endColumn: number): string[] {
  const columnNames: string[] = [];

  for (let i = startColumn; i <= endColumn; i++) {
    const columnName = getColumnLetter(i);
    columnNames.push(columnName);
  }

  return columnNames;
}

export function formatTimeDifference(likedTime: string) {
  const currentTime = dayjs();
  const timeDifference = currentTime.diff(likedTime, 'second');

  if (timeDifference < 60) {
    return 'just now';
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes} minutes ago`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    return `${hours} hours ago`;
  } else if (timeDifference < 604800) {
    // 7 days (1 week)
    const days = Math.floor(timeDifference / 86400);
    return `${days} days ago`;
  } else if (timeDifference < 2592000) {
    // 30 days
    const weeks = Math.floor(timeDifference / 604800);
    return `${weeks} weeks ago`;
  } else if (timeDifference < 31536000) {
    // 365 days
    const months = Math.floor(timeDifference / 2592000);
    return `${months} months ago`;
  } else {
    const years = Math.floor(timeDifference / 31536000);
    return `${years} years ago`;
  }
}
