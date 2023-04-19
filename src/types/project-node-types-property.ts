export type ProjectNodeTypePropertySubmit = {
    project_id?: string;
    project_type_id?: string;
    name: string;
    unique_type: boolean;
    multiple_type: boolean;
    required_type: boolean;
    ref_property_type_id: string;
    propertyId?: string
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
