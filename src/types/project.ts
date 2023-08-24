export type ProjectListResponse = {
    id: string;
    icon: string;
    title: string;
    color: string;
    updated_at: string;
    privacy: string;
    folder_id: string;
    user: {
        id: string;
        first_name: string;
    }
}

export type FullWidth = {
    fullWidth?: boolean;
};

export type ProjectList = {
    color: string;
    dateTime: string;
    icon: string;
    name: string;
    type: string;
    id: string;
    folderId: string;
    user?: {
        first_name: string;
        id: string;
    }
};

export type IProjectViewModal = {
    color: string;
    dateTime: string;
    icon: string;
    name: string;
    type: string;
    id: string;
    folderId: string;
    user: {
        id: string;
        first_name: string;
    }
}

export type ProjectButtonContent = FullWidth & {
    project: ProjectList;
}

export type ProjectStatisticsType = {
    comments: number;
    likes: number;
    views: number;
    size: number | 'small' | 'middle' | 'large';
}
