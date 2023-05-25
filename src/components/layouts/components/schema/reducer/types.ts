import { Node } from '@antv/x6';
import { SchemaAction } from './schema-manager';

export interface IIsOpen {
  isOpened?: boolean;
}

export interface IEdgeState extends IIsOpen {
  id?: string;
  source?: string;
  target?: string;
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

export interface IEdgePortState extends IIsOpen {
  id?: string;
  name?: string;
  x?: number;
  y?: number;
  color?: string[];
}

export type SchemaState = {
  edge?: IEdgeState;
  type?: ITypeState;
  type_port?: ITypePortState;
  edge_port?: IEdgePortState;
};

export type Item = 'edge_port' | 'type_port' | 'type' | 'edge';

export interface DataSheetAction {
  type: SchemaAction;
  payload: SchemaState;
}
