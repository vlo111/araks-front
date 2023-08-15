export interface GraphData {
  edges: {
    source: string;
    target: string;
  }[];
  nodes: { id: string; label: string }[];
}
