export type ProjectNodeTypeSubmit = {
    project_id: string;
    parent_id: string;
    name: string;
    color: string;
    fx?: number;
    fy?: number;
    inherit?: boolean;
}