import { Graph, Node, Edge, Cell, Point } from '@antv/x6';
import { Options } from '@antv/x6/lib/graph/options';

import Properties = Edge.Properties;
import { IProjectType, ITypeProperty, UserProjectRole } from 'api/types';
import { ProjectEdgeResponse } from 'types/project-edge';
import { Highlighter } from '@antv/x6/lib/registry';
import {
  IEdgePortState,
  IEdgeState,
  IPerspectiveInfo,
  IPerspectiveState,
  ISelectNode,
  ITypePortState,
  ITypeState,
} from './reducer/types';
import { PropertyTypes } from '../../../form/property/types';
import { ReturnPerspectiveTypeData } from 'api/perspective/use-add-type-perspective';

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

export type ContextTypeProject = { role: UserProjectRole | null };

export type InitGraph = (
  container: HTMLDivElement,
  params: PickSchemaContextType,
  projectInfo: ContextTypeProject | null
) => Graph;

export type InitNodes = (graph: Graph, cells: Cell<Cell.Properties>[], params: PickSchemaContextType) => void;

export type InitEvents = (graph: Graph, params: PickSchemaContextType, projectInfo: ContextTypeProject | null) => void;

export type InitPerspectiveEvents = (graph: Graph, setPerspectiveInfo: (info: IPerspectiveInfo) => void) => void;

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

export type SelectNode = (
  graph: Graph,
  container: Element,
  node: Node<Node.Properties>,
  projectInfo: ContextTypeProject | null
) => void;

export type SelectNodeWithZoom = (
  id: string,
  graph: Graph | undefined,
  selected: ISelectNode,
  setSelected: (item: ISelectNode) => void
) => void;

export type AddEdgeType = (item: ProjectEdgeResponse) => void;

export type GetTypeColors = (edge: Edge<Properties>) => string[];

export type InsertProperty = (prop: ITypeProperty & { color: string; allow: boolean }) => IPort;

export type SwitchTypePermission = (node: Node<Node.Properties>, isAllow: boolean) => void;

export type ChangeTypePosition = (id: string, position: Point.PointLike) => void;

export type AddTypePerspective = (type_id: string) => Promise<ReturnPerspectiveTypeData> | null;

export type SetPerspectiveData = (items: { perspectiveId?: string; project_id?: string } | null) => void;

export type SchemaReducerState = {
  graph: Graph;
  nodes: IProjectType[];
  edges: ProjectEdgeResponse[];
  selected: ISelectNode;
  edge: IEdgeState;
  type: ITypeState;
  type_port: ITypePortState;
  edge_port: IEdgePortState;
  perspective: IPerspectiveState;
  perspective_info: IPerspectiveInfo;
};

export type SchemaReducerSetState = {
  setGraph: (graph: Graph) => void;
  setNodes: (nodes: IProjectType[]) => void;
  setEdges: (nodes: ProjectEdgeResponse[]) => void;
  setSelected: (selectData: ISelectNode) => void;
  setPerspectiveInfo: (info: IPerspectiveInfo) => void;

  startEdgeType: (edge?: IEdgeState) => void;
  startType: (type?: ITypeState) => void;
  startTypePort: (port?: ITypePortState) => void;
  startEdgePort: (port?: IEdgePortState) => void;
  finishEdgeType: VoidFunction;
  finishType: VoidFunction;
  finishTypePort: VoidFunction;
  finishEdgePort: VoidFunction;
  startPerspectiveShare: (port?: IPerspectiveState) => void;
  finishPerspectiveShare: VoidFunction;
};

export interface SchemaContextType extends SchemaReducerSetState, SchemaReducerState {}

export type OnEdgeLabelRendered = (args: Options.OnEdgeLabelRenderedArgs) => void;

export type PickSchemaContextType = Pick<
  SchemaContextType,
  'startType' | 'startEdgeType' | 'startTypePort' | 'startEdgePort' | 'setSelected' | 'selected' | 'setPerspectiveInfo'
>;

export type NodeEdgeTypesForm = {
  project_id: string;
  name: string;
  target_id: string;
  source_id: string;
  source_attribute_id: string;
  target_attribute_id: string;
  inverse: boolean;
  multiple: boolean;
  ref_property_type_id?: PropertyTypes.Connection;
  propertyId?: string;
};

export type ISelectedPerspective = {
  perspectiveId: string;
  project_id: string;
};
