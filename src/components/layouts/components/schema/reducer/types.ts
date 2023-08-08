import { Graph, Node } from '@antv/x6';
import { SchemaAction } from './schema-manager';
import { IProjectType, ISharedPerspectiveData } from 'api/types';
import { ProjectEdgeResponse } from 'types/project-edge';

export interface IIsOpen {
  isOpened?: boolean;
}

export interface IEdgeState extends IIsOpen {
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

export interface ITypeState extends IIsOpen {
  x?: number;
  y?: number;
}

export interface ITypePortState extends IIsOpen {
  portId?: string;
  isUpdate?: boolean;
  node?: Node<Node.Properties>;
  x?: number;
  y?: number;
}

export interface IPerspectiveState extends IIsOpen {
  id?: string;
  openShare: boolean;
  sharedUsers?: ISharedPerspectiveData[];
}

export interface IEdgePortState extends IIsOpen {
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
  selected_perspective?: ISelectedPerspective;
};

export interface SchemaActionType {
  type: SchemaAction;
  payload: SchemaState;
}

export type ISelectedPerspective = {
  perspectiveId: string;
  project_id: string;
};
