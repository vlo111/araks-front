export type ProjectNodeTypeSubmit = {
    project_id: string;
    parent_id: string;
    name: string;
    color: string;
    fx?: number;
    fy?: number;
    inherit?: boolean;
}

export type ProjectNodeTypeResponse = {
    project_id: string;
    parent_id: string;
    name: string;
    color: string;
    fx?: number;
    fy?: number;
    created_at: string;
    data: string;
    id: string;
    updated_at: string;
    user_id: string;
}
