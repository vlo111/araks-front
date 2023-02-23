import { SortItems } from './sort';

export const PROJECT_SORT: SortItems[] = [
    {
        label: 'A to Z',
        key: 'title asc',
    },
    {
        label: 'Z to A',
        key: 'title desc',
    },
    {
        label: 'Newest First',
        key: 'updated_at asc',
    },
    {
        label: 'Oldest First',
        key: 'updated_at desc',
    },
];
