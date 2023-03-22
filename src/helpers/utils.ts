import { AUTH_KEYS, DEFAULT_ICON } from './constants';
import { iconsList } from 'components/icon';

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
