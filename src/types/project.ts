import { DataNode } from 'antd/es/tree';
export type ProjectListResponse = {
    id: string;
    icon: string;
    title: string;
    color: string;
    updated_at: string;
    privacy: string;
    folder_id: string;
}

export type FullWidth = {
    fullWidth?: boolean;
};

export type ProjectList = {
    color: string;
    dateTime: string;
    icon?: string;
    name: string;
    type: string;
    id: string;
    folderId: string;
};

export type ProjectButtonContent = FullWidth & {
    project: ProjectList;
}

export type ProjectStatisticsType = {
    comments: number;
    likes: number;
    views: number;
    size: number | 'small' | 'middle' | 'large';
}

export type TreeStructure = {
    title: React.ReactNode | ((data: DataNode) => React.ReactNode),
    key: string,
    children?: TreeStructure[],
};

export type TreeStructureLabel = {
    value: string,
    children?: TreeStructureLabel[],
    label?: string
};