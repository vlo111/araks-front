import React from 'react';
import { Cell, Edge, Graph } from '@antv/x6';
import { Options } from '@antv/x6/lib/graph/options';
import { LinkPropertyModal } from './provider';

import Properties = Edge.Properties;
import TerminalType = Edge.TerminalType;
import TerminalData = Edge.TerminalData;
import OnEdgeLabelRenderedArgs = Options.OnEdgeLabelRenderedArgs;

interface ILine {
  sourceMarker?: { name?: string, fill: string }
  targetMarker?: { name?: string, fill: string }
  stroke: IStroke
  strokeWidth: number
}

interface IBody {
  stroke: string
}

interface IPosition {
  x: number
  y: number
}

interface IConnection {
  cell: string
  port?: string
}

interface ILabel {
  name?: string
  markup: any
  attrs: {
    fo: {
      width: number
      height: number
      x: number
      y: number
    }
  }
}

interface IPortFill {
  type: string
  stops: Array<{ offset: string, color: string }>
}

interface IPortAttribute {
  portBody: {
    fill: IPortFill | string
    strokeWidth?: number
  }
  portNameLabel: {
    fill?: string
    text: string
  }
  portTypeLabel?: {
    text: string
  }
}

interface IPort {
  id?: string
  group: string
  attrs?: IPortAttribute
  args?: {
    x: string
    y: string
  }
}

export interface IGraph {
  id: string
  height?: number
  shape: string
  label?: string | ILabel
  width?: number
  position?: IPosition
  attrs: {
    line?: ILine
    body?: IBody
  }
  tools?: {
    name: string
  }
  ports?: IPort[]
  source?: IConnection
  target?: IConnection
  zIndex?: number
}

export interface IStroke {
  type: string
  stops: Array<{
    offset: string
    color: string
  }>
}

export type InitGraphType = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  openAddLinkPropertyModal: React.Dispatch<
  React.SetStateAction<LinkPropertyModal>
  >
) => Graph;

export type OnEdgeLabelRendered = (
  args: OnEdgeLabelRenderedArgs,
  openAddLinkPropertyModal: React.Dispatch<
  React.SetStateAction<LinkPropertyModal>
  >
) => void;

export type ElementStyle = Element & {
  style: { outline: string }
  dataset: { cellId: string }
};

export type RemoveElement = (graph: Graph, element: ElementStyle) => void;

export type CellRemovePort = Cell<Cell.Properties> & {
  removePort: (id: string) => void
};

export interface EdgeCreate {
  edge: Edge<Properties>
  type: TerminalType
  previous: TerminalData
}

export type BoundingEvent = EventTarget & {
  tagName: string
  previousElementSibling: { firstChild: HTMLElement }
  getBoundingClientRect: () => ClientRect
};

export interface ClientRect {
  x: number
  y: number
  height: number
  width: number
}

export type ElementBox = Element & {
  getBBox: () => { height: number, width: number }
};
