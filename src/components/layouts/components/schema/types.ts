import { Graph as GraphX6, Node, Edge, Cell } from '@antv/x6';
import { Options } from '@antv/x6/lib/graph/options';

import { Dispatch, SetStateAction } from 'react';
import Properties = Edge.Properties;
import TerminalType = Edge.TerminalType;
import TerminalData = Edge.TerminalData;
import {IProjectType, ITypeProperty} from '../../../../api/types';
import { ProjectEdgeResponse } from '../../../../types/project-edge';
import { AxiosResponse } from 'axios';
import { FormInstance } from 'antd';
import { Highlighter } from '@antv/x6/lib/registry';

export interface IStroke {
  type: string;
  stops: Array<{
    offset: string;
    color: string;
  }>;
}

interface ILine {
  sourceMarker?: { name?: string; fill: string };
  targetMarker?: { name?: string; fill: string };
  stroke: IStroke;
  strokeWidth: number;
}

interface IBody {
  stroke: string;
}

interface IPosition {
  x: number;
  y: number;
}

interface IConnection {
  cell: string;
  port?: string;
}

interface ILabel {
  name?: string;
  markup: never;
  attrs: {
    fo: {
      width: number;
      height: number;
      x: number;
      y: number;
    };
  };
}

export interface IPortFill {
  type: string;
  stops: Array<{ offset: string; color: string }>;
}

export interface IPortAttribute {
  required_type?: boolean;
  multiple_type?: string;
  unique_type?: boolean;
  portBody: {
    fill: IPortFill | string;
    strokeWidth?: number;
  };
  portNameLabel: {
    fill?: string;
    text: string;
  };
  portTypeLabel: {
    text: string;
    refX?: number
  };
  eye?: { d: string },
  eye_point?: { d: string }
}

export interface IPort {
  id?: string;
  group: string;
  attrs?: IPortAttribute;
  zIndex?: number;
  args?: {
    x: string;
    y: string;
  };
}

export interface INode {
  id: string;
  height?: number;
  shape: string;
  label?: string | ILabel;
  width?: number;
  position?: IPosition;
  attrs: {
    line?: ILine;
    body?: IBody;
    parentId?: string;
  };
  tools?: {
    name: string;
  };
  ports?: IPort[];
  source?: IConnection;
  target?: IConnection;
  zIndex?: number;
}

export type PortModal =
  | undefined
  | { node: Node<Node.Properties>; portId: string; isUpdate: boolean; x: number; y: number };

export type SelectedNode = Node<Node.Properties> | string | undefined;

export type LinkPropertyModal =
  | undefined
  | { id?: string; name?: string; open: boolean; x?: number; y?: number; color?: string[] };

export type OpenAddType = undefined | number[];

export type AddLinkModal = undefined | boolean | { id?: string; source?: string; target?: string };

export type Graph = GraphX6;

export interface SchemaContextType {
  graph: GraphX6;
  selectedNode: SelectedNode | string | undefined;
  nodes: IProjectType[];
  edges: ProjectEdgeResponse[];
  addPortModal: PortModal;
  addTypeModal: OpenAddType;
  addLinkModal: AddLinkModal;
  openLinkPropertyModal: LinkPropertyModal;

  setAddTypeModal: OpenTypeModal;
  setGraph: (item: Graph) => void;
  setAddPortModal: Dispatch<SetStateAction<PortModal>>;
  setAddLinkModal: Dispatch<SetStateAction<AddLinkModal>>;
  setOpenLinkPropertyModal: Dispatch<SetStateAction<LinkPropertyModal>>;
  setNodes: Dispatch<SetStateAction<IProjectType[]>>;
  setEdges: Dispatch<SetStateAction<ProjectEdgeResponse[]>>;
  setSelectedNode: (item: SelectedNode | undefined) => void;
}

export interface ClientRect {
  x: number;
  y: number;
  height: number;
  width: number;
}

export type BoundingEvent = EventTarget & {
  tagName: string;
  previousElementSibling: { firstChild: HTMLElement };
  getBoundingClientRect: () => ClientRect;
};

export type OnEdgeLabelRendered = (
  args: Options.OnEdgeLabelRenderedArgs,
  setOpenLinkPropertyModal: Dispatch<SetStateAction<LinkPropertyModal>>,
  nodes: Node<Node.Properties>[]
) => void;

export interface EdgeCreate {
  edge: Edge<Properties>;
  type: TerminalType;
  previous: TerminalData;
}

export type PickSchemaContextType = Pick<
  SchemaContextType,
  | 'addPortModal'
  | 'openLinkPropertyModal'
  | 'selectedNode'
  | 'addTypeModal'
  | 'setAddPortModal'
  | 'setAddLinkModal'
  | 'setSelectedNode'
  | 'setAddTypeModal'
  | 'setOpenLinkPropertyModal'
>;

export type InitGraph = (container: HTMLDivElement, params: PickSchemaContextType) => Graph;

export type InitNodes = (graph: Graph, cells: Cell<Cell.Properties>[], params: PickSchemaContextType) => void;

export type InitEvents = (graph: Graph, params: PickSchemaContextType) => void;

export type ElementBox = Element & {
  getBBox: () => { height: number; width: number };
};

export type ElementStyle = Element & {
  style: { outline: string };
  dataset: { cellId: string };
};

export type RemoveElement = (graph: Graph, element: ElementStyle) => void;
export type AnimateGraphFit = (graph: Graph, sec: string) => void;

export type CellRemovePort = Cell<Cell.Properties> & {
  removePort: (id: string) => void;
};

export type SetPropertyColor = (ref_property_type_id: string, color: string) => { fill: IPortFill } | { fill: string };

export type InsertAddProperty = () => IPort;

export type OpenTypeModal = (param: OpenAddType) => void;

export type Highlighter = Highlighter.Definition<unknown>;

export type SelectNode = (graph: Graph, container: Element, node: Node<Node.Properties>) => void;

export type SelectNodeWithZoom = (
  id: string,
  graph: Graph,
  selectedNode: Node<Node.Properties> | undefined | string,
  setSelectedNode: (item: SelectedNode | undefined) => void
) => void;

export type PropsAddEdge = {
  form: FormInstance;
  onCancel: VoidFunction;
};

export type AddEdgeType = (item: ProjectEdgeResponse) => void;

export type AddProperty = (
  id: string,
  name: string,
  multiple: boolean
) => Promise<AxiosResponse<{ id: string }, never>>;

export type GetTypeColors = (edge: Edge<Properties>) => string[];

export type InsertProperty = (prop: ITypeProperty & { color: string }) => IPort;
