export type PreviewEdgeType = {
  id: string;
  source: string;
  target: string;
  label: string;
};

export type PreviewGraphType = {
  nodes: {
    color: string;
    fx: number | null;
    fy: number | null;
    id: string;
    name: string;
    parent_id: string | null;
  }[];
  edges: PreviewEdgeType[] | null;
};
