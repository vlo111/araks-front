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

export type ProjectInfoReturnData = {
    comments: number;
    likes: number;
    result: ProjectFullInfo;
    views: number;
};

export type UserData = {
    email: string;
    first_name: string;
    id: string;
    last_name: string;
    username: string;
};

export type ProjectReturnData = ProjectFullInfo & {
    user: UserData
};

export type ProjectTreeReturnData = {
    color: string;
    id: string;
    name: string;
    parent_id: string;
}