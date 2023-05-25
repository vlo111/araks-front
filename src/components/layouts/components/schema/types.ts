import { Graph, Node, Edge, Cell } from '@antv/x6';
import { Options } from '@antv/x6/lib/graph/options';

import Properties = Edge.Properties;
import { IProjectType, ITypeProperty } from 'api/types';
import { ProjectEdgeResponse } from 'types/project-edge';
import { Highlighter } from '@antv/x6/lib/registry';
import { IEdgePortState, IEdgeState, ISelectNode, ITypePortState, ITypeState } from "./reducer/types";

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
  cursor: string;
  allow: boolean;
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

interface IPortAttribute {
  required_type?: boolean;
  multiple_type?: boolean;
  unique_type?: boolean;
}

export type PortAttributes = {
  [key: string]: {
    fill: IPortFill | string;
    strokeWidth?: number;
  } & {
    fill?: string;
    text: string;
  } & {
    text: string;
    refX?: number;
  };
} & IPortAttribute;

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
    allow?: boolean;
  };
  tools?: {
    name: string;
  };
  ports?: IPort[];
  source?: IConnection;
  target?: IConnection;
  zIndex?: number;
}

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

export type Highlighter = Highlighter.Definition<unknown>;

export type SelectNode = (graph: Graph, container: Element, node: Node<Node.Properties>) => void;

export type SelectNodeWithZoom = (
  id: string,
  graph: Graph | undefined,
  selected: ISelectNode,
  setSelected: (item: ISelectNode) => void
) => void;

export type PropsAddEdge = {
  onCancel: VoidFunction;
};

export type AddEdgeType = (item: ProjectEdgeResponse) => void;

export type GetTypeColors = (edge: Edge<Properties>) => string[];

export type InsertProperty = (prop: ITypeProperty & { color: string; allow: boolean }) => IPort;

export type SwitchPermission = (node: Node<Node.Properties>, portId: string | undefined, isAllow: boolean) => void;

export type SwitchTypePermission = (node: Node<Node.Properties>, isAllow: boolean) => void;

export type ChangeTypePosition = (id: string, x: number, y: number) => void;

export type SchemaReducerState = {
  graph: Graph;
  nodes: IProjectType[];
  edges: ProjectEdgeResponse[];
  selected: ISelectNode;
  edge: IEdgeState;
  type: ITypeState;
  type_port: ITypePortState;
  edge_port: IEdgePortState;
};

export type SchemaReducerSetState = {
  setGraph: (graph: Graph) => void;
  setNodes: (nodes: IProjectType[]) => void;
  setEdges: (nodes: ProjectEdgeResponse[]) => void;
  setSelected: (selectData: ISelectNode) => void;

  startEdgeType: (edge?: IEdgeState) => void;
  startType: (type?: ITypeState) => void;
  startTypePort: (port?: ITypePortState) => void;
  startEdgePort: (port?: IEdgePortState) => void;
  finishEdgeType: VoidFunction;
  finishType: VoidFunction;
  finishTypePort: VoidFunction;
  finishEdgePort: VoidFunction;
};

export interface SchemaContextType extends SchemaReducerSetState, SchemaReducerState {}

export type OnEdgeLabelRendered = (args: Options.OnEdgeLabelRenderedArgs) => void;

export type PickSchemaContextType = Pick<
  SchemaContextType,
  'startType' | 'startEdgeType' | 'startTypePort' | 'startEdgePort' | 'setSelected' | 'selected'
>;
