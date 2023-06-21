import { SortItems } from './sort';

export const PROJECT_SORT: SortItems[] = [
  {
    label: 'A to Z',
    key: 'title ASC',
  },
  {
    label: 'Z to A',
    key: 'title DESC',
  },
  {
    label: 'Newest First',
    key: 'updated_at DESC',
  },
  {
    label: 'Oldest First',
    key: 'updated_at ASC',
  },
];

export const ALL_DATA_SORT_BY: SortItems[] = [
  {
    label: 'Connection Type',
    key: 'Connection Type',
  },
  {
    label: 'Node Type',
    key: 'Node Type',
  },
];

/** @deprecated not used */
export const SORT_DIRECTION: SortItems[] = [
  {
    label: 'Ascending',
    key: 'ASC',
  },
  {
    label: 'Descending',
    key: 'DESC',
  },
];

export const SHARE_OPTIONS = [
  {
    label: 'Can Edit',
    value: 'edit',
  },
  {
    label: 'Can View',
    value: 'view',
  },
  {
    label: 'Owner',
    value: 'owner',
  },
];
