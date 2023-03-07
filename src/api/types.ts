export type GetProjectsParameters = {
    page?: number,
    size?: number,
    sortField?: string,
    sortOrder?: string
}

export enum RequestTypes {
    GET = 'get',
    Post = 'post',
    Put = 'put',
    Delete = 'delete',
}

export type RequestType = RequestTypes | undefined;

// Project related types
export type CreateOverviewFormData = {
    title: string;
    description: string;
    privacy: string;
    color: string;
    icon: string;
};

export type ProjectFullInfo = {
    color: string;
    created_at: string;
    description: string;
    folder_id: string;
    icon: string;
    id: string;
    notifications: boolean;
    privacy: string;
    status: string;
    title: string;
    token: string;
    updated_at: string;
    user_id: string;
}

export type ProjectReturnData = {
    comments: number;
    likes: number;
    project: ProjectFullInfo;
    views: number;
};