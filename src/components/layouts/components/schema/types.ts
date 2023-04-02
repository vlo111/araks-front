import { Graph as GraphX6, Node } from '@antv/x6';

interface IStroke {
    type: string
    stops: Array<{
        offset: string
        color: string
    }>
}

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

export interface IPortAttribute {
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

export interface IPort {
    id?: string
    group: string
    attrs?: IPortAttribute
    args?: {
        x: string
        y: string
    }
}

export interface INode {
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

export type PortModal = boolean | { node: Node<Node.Properties>, portId: string, isUpdate: boolean, x: number, y: number };

export type SelectedNode = Node<Node.Properties> | undefined;

export type SetGraph = (item: Graph) => void;

export type LinkPropertyModal =
    | boolean
    | { x: number, y: number, color: string[] };

export type OpenAddType = boolean | number[]

export type Graph = GraphX6

export interface SchemaContextType {
    graph: GraphX6;
    addPortModal: false | PortModal,
    openLinkPropertyModal: LinkPropertyModal | boolean,
    selectedNode: SelectedNode | boolean,
    openAddType: OpenAddType,
    setGraph: (item: Graph) => void;
    setOpenAddType: (item: OpenAddType) => void;
    setAddPortModal: (item: PortModal | boolean) => void;
    setSelectedNode: (item: SelectedNode | undefined) => void;
    setOpenLinkPropertyModal: (item: LinkPropertyModal | boolean) => void;
}
