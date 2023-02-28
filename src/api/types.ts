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
