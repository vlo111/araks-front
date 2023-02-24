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
        key: 'updated_at ASC',
    },
    {
        label: 'Oldest First',
        key: 'updated_at DESC',
    },
];
