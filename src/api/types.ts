import { PropertyTypes } from 'components/form/property/types';
import { EdgeType } from 'types/node';

export type GetProjectsParameters = {
  page?: number;
  size?: number;
  sortField?: string;
  sortOrder?: string;
};

export type PageParameters = {
  page: number;
  size: number;
};

export type SearchPageParameters = PageParameters & {
  search?: string;
};

export type AllDataPageParameters = {
  page: number;
  size: number;
  sortField?: string;
  sortOrder?: string;
  search?: string;
  project_type_list_id?: string[];
  type?: string;
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
  folder_id: string;
};

export enum UserProjectRole {
  Owner = 'owner',
  Editor = 'edit',
  Viewer = 'view',
}

export type PerspectiveUser = {
  role: UserProjectRole;
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
  perspective_users: PerspectiveUser[];
  projectsNodeTypes: IProjectType[];
  projectsEdgeTypes: {
    id: string;
    source_id: string;
    target_id: string;
    name: string;
  }[];
  commentCount?: number;
  favoriteCount?: number;
  views?: number;
};

export type ProjectInfoReturnData = {
  result: ProjectFullInfo;
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

export interface IPerspectiveTypes {
  project_node_type_id: string;
}

export type IProjectTypeData = ProjectFullInfo;

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
  source?: EdgeType;
  target?: EdgeType;
  source_attribute_id?: string;
  source_id?: string;
  target_attribute_id?: string;
  target_id?: string;
};

export type NodeDataConnectionToSave = {
  target_id: string;
  target_type_id: string;
  name: string;
  id: string;
  rowId?: string; // used only for save, assign id to him then pass to packend
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
  ref_property_type_id: PropertyTypes;
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
    color?: string;
  };
  target: {
    id: string;
    name: string;
    color?: string;
  };
  target_attribute_id: string;
  target_id: string;
  updated_at: string;
  user_id: string;
  properties: ProjectTypePropertyReturnData[];
};

export interface CustomError {
  errors: {
    message: string;
  };
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
  nodeType: { project_node_type_id: string }[];
  shared: ISharedPerspectiveData[];
}

export interface ISharedPerspectiveUser {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface ISharedPerspectiveUserData {
  perspective_id: string;
  status: string;
  role: string;
  perspective_users: ISharedPerspectiveUser;
}

export interface IResponsePerspectiveUsers {
  id: string;
  title: string;
  description: string;
  status: string;
  project_id: string;
  shared: ISharedPerspectiveUserData[];
  nodeType: [];
}

export type CheckPropertyBody = {
  project_id?: string;
  project_type_id?: string;
  ref_property_type_id?: PropertyTypes;
};

export type CheckPropertyResponse = {
  invalidCount: number;
  allCount: number;
};

export type ProjectCommentListParams = {
  project_id: string;
};

export type ProjectCommentManage = {
  comments: string;
  project_id?: string;
  parent_id?: string | null;
  mentioned_users?: string[];
};

export type CommentData = {
  id: string;
  comments: string;
  parent_id: null;
  project_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: ISharedPerspectiveUser;
  children?: CommentData[];
};

export type CommentsResponse = {
  count: number;
  rows: CommentData[];
};
