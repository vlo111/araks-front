import { Graph as GraphX6, Node } from '@antv/x6';

export type PortModal = boolean | { node: any, port?: any, isUpdate: boolean, x: number, y: number };

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
