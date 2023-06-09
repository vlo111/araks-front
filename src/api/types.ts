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

type ProjectTreeProperties = {
  id: string;
  name: string;
  default_property?: boolean;
};

export type ProjectTreeReturnData = {
  color: string;
  id: string;
  name: string;
  parent_id: string;
  properties?: ProjectTreeProperties[];
};

export interface ITypeProperty {
  id: string;
  name: string;
  multiple_type?: boolean;
  unique_type?: boolean;
  required_type?: boolean;
  default_property?: boolean;
  ref_property_type_id: string;
}

export interface IProjectType {
  color: string;
  id: string;
  name: string;
  parent_id: string;
  fx: number;
  fy: number;
  x?: number;
  y?: number;
  properties: ITypeProperty[];
}

export interface IProjectTypeData extends ProjectFullInfo {
  projectsNodeTypes: IProjectType[];
}

export type ProjectTypePropertyReturnData = {
  created_at: string;
  default_property: boolean;
  default_image?: boolean;
  id: string;
  multiple_type: boolean;
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
  default_property: boolean;
  unique_type: boolean;
  required_type: boolean;
  user_id: string;
  project_id: string;
  project_type_id: string;
  ref_property_type_id: string;
  created_at: string;
  updated_at: string;
};

export type NodeEdgeTypesReturnData = {
  created_at: string;
  id: string;
  name: string;
  project_id: string;
  inverse: boolean;
  multiple: boolean;
  ref_property_type_id: number;
  source_attribute_id: string;
  source_id: string;
  source: {
    id: string;
    name: string;
  };
  target: {
    id: string;
    name: string;
  };
  target_attribute_id: string;
  target_id: string;
  updated_at: string;
  user_id: string;
};

export interface CustomError {
  message: string;
}

export interface ISharedPerspectiveData {
  created_at: string;
  id: string;
  perspective_id: string;
  perspective_user_id: string;
  project_id: string;
  role: string;
  status: string;
  updated_at: string;
  user_id: string;
}

export interface IResponsePerspectiveData {
  description: string;
  id: string;
  project_id: string;
  status: string;
  title: string;
  shared: ISharedPerspectiveData[];
}
