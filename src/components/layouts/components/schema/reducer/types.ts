import { Graph, Node } from '@antv/x6';
import { SchemaAction } from './schema-manager';
import { IProjectType, ISharedPerspectiveData } from 'api/types';
import { ProjectEdgeResponse } from 'types/project-edge';

export interface IIdOpen {
  isOpened?: boolean;
}

export interface IEdgeState extends IIdOpen {
  id?: string;
  source?: string;
  target?: string;
  isUpdate: boolean;
  isConnector?: boolean;
}

export interface ISelectNode {
  id?: string;
  node?: Node<Node.Properties>;
  selected?: boolean;
}

export interface ITypeState extends IIdOpen {
  x?: number;
  y?: number;
}

export interface ITypePortState extends IIdOpen {
  portId?: string;
  isUpdate?: boolean;
  node?: Node<Node.Properties>;
  x?: number;
  y?: number;
}

export interface IPerspectiveState extends IIdOpen {
  id?: string;
  openShare: boolean;
  sharedUsers?: ISharedPerspectiveData[];
}

export interface IPerspectiveInfo {
  typesLength: number;
  propertiesLength: number;
}

export interface IEdgePortState extends IIdOpen {
  id?: string;
  name?: string;
  x?: number;
  y?: number;
  color?: string[];
}

export type SchemaState = {
  nodes?: IProjectType[];
  selected?: ISelectNode;
  edges?: ProjectEdgeResponse[];
  graph?: Graph;
  edge?: IEdgeState;
  type?: ITypeState;
  type_port?: ITypePortState;
  edge_port?: IEdgePortState;
  perspective?: IPerspectiveState;
  perspective_info?: IPerspectiveInfo;
};

export interface SchemaActionType {
  type: SchemaAction;
  payload: SchemaState;
}
