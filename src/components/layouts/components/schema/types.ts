import { Graph as GraphX6, Node, Edge, Cell } from '@antv/x6';
import { Options } from '@antv/x6/lib/graph/options';

import OnEdgeLabelRenderedArgs = Options.OnEdgeLabelRenderedArgs;
import { Dispatch, SetStateAction } from 'react';
import Properties = Edge.Properties;
import TerminalType = Edge.TerminalType;
import TerminalData = Edge.TerminalData;
import { ITypeProperty } from '../../../../api/types';
import { TreeNodeType } from "../../../../pages/data-sheet/types";

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
  markup: any;
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
  portBody: {
    fill: IPortFill | string;
    strokeWidth?: number;
  };
  portNameLabel: {
    fill?: string;
    text: string;
  };
  portTypeLabel?: {
    text: string;
  };
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

export type LinkPropertyModal = undefined | { x: number; y: number; color: string[] };

export type OpenAddType = undefined | number[];

export type Graph = GraphX6;

export interface SchemaContextType {
  graph: GraphX6;
  selectedNode: SelectedNode | string | undefined;

  addPortModal: PortModal;
  openLinkPropertyModal: LinkPropertyModal;
  addTypeModal: OpenAddType;
  setAddTypeModal: OpenTypeModal;
  setGraph: (item: Graph) => void;
  setAddPortModal: Dispatch<SetStateAction<PortModal>>;
  setNodesTree: Dispatch<SetStateAction<TreeNodeType[]>>;
  nodesTree: TreeNodeType[];
  setSelectedNode: (item: SelectedNode | undefined) => void;
  setOpenLinkPropertyModal: Dispatch<SetStateAction<LinkPropertyModal>>;
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
  args: OnEdgeLabelRenderedArgs,
  setOpenLinkPropertyModal: Dispatch<SetStateAction<LinkPropertyModal>>,
  nodes: INode[]
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
  | 'setSelectedNode'
  | 'setAddTypeModal'
  | 'setOpenLinkPropertyModal'
>;

export type InitGraph = (container: HTMLDivElement, params: PickSchemaContextType) => Graph;

export type InitNodes = (
  graph: Graph,
  cells: Cell<Cell.Properties>[],
  params: PickSchemaContextType
) => void;

export type InitEvents = (graph: Graph, params: PickSchemaContextType) => void;

export type ElementBox = Element & {
  getBBox: () => { height: number; width: number };
};

export type ElementStyle = Element & {
  style: { outline: string };
  dataset: { cellId: string };
};

export type RemoveElement = (graph: Graph, element: ElementStyle) => void;

export type CellRemovePort = Cell<Cell.Properties> & {
  removePort: (id: string) => void;
};

export type SetPropertyColor = (property: ITypeProperty, color: string) => { fill: IPortFill } | { fill: string };

export type InsertAddProperty = () => IPort;

export type OpenTypeModal = (param: OpenAddType) => void;

export type SelectNode = (graph: Graph, container: Element, node: Node<Node.Properties>) => void
