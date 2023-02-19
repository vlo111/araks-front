import { SortItems } from './sort';

export const PROJECT_SORT: SortItems[] = [
    {
        label: 'A to Z',
        key: 'name asc',
    },
    {
        label: 'Z to A',
        key: 'name desc',
    },
    {
        label: 'Newest First',
        key: 'date asc',
    },
    {
        label: 'Oldest First',
        key: 'date desc',
    },
];
