export type GetProjectsParameters = {
  page?: number;
  size?: number;
  sortField?: string;
  sortOrder?: string;
};

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
};

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
  user: UserData;
};

export type ProjectTreeReturnData = {
  color: string;
  id: string;
  name: string;
  parent_id: string;
};

export interface ITypeProperty {
  id: string
  name: string;
  multiple_type: string;
  unique_type: boolean;
  required_type: boolean;
  default_proprty: boolean;
  ref_property_type_id: string;
}

export interface IProjectType {
  color: string;
  id: string;
  name: string;
  parent_id: string;
  position?: {
    x: number,
    y: number
  }
  properties: ITypeProperty[]
}

export interface IProjectTypeData extends ProjectFullInfo{
  projectsNodeTypes: IProjectType[]
}

export type ProjectTypePropertyReturnData = {
  created_at: string;
  default_proprty: boolean;
  id: string;
  multiple_type: string;
  name: string;
  project_id: string;
  project_type_id: string;
  ref_property_type_id: string;
  required_type: boolean;
  unique_type: boolean;
  updated_at: string;
  user_id: string;
};

/** Folder types */
export type ProjectFolderReturnData = {
  id: string;
  title: string;
  status: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

/** Node Type Property */
export type ProjectNodeTypePropertyReturnData = {
  id: string;
  name: string;
  multiple_type: boolean;
  default_proprty: boolean;
  unique_type: boolean;
  required_type: boolean;
  user_id: string;
  project_id: string;
  project_type_id: string;
  ref_property_type_id: string;
  created_at: string;
  updated_at: string;
};
