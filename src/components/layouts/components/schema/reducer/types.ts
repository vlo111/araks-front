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

export interface IPortState extends IIsOpen {
  portId?: string;
  isUpdate?: boolean;
  node?: Node<Node.Properties>;
  x?: number;
  y?: number;
}

export type SchemaState = {
  edge?: IEdgeState;
  type?: ITypeState;
  port?: IPortState
};

export type Item = 'port' | 'type' | 'edge'

export interface DataSheetAction {
  type: SchemaAction;
  payload: SchemaState;
}
