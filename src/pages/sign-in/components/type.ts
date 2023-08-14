export type HelpNodeType = {
  id: string;
  name?: string;
  label?: string;
  description?: string;
  x: number;
  y: number;
  style: {
    fill: string;
  };
  size?: number;
  target?: HelpTargetType[];
};

export type HelpEdgeType = {
  id: string;
  label?: string;
  source: string;
  target: string;
};

export type HelpTargetType = {
  id: string;
  name: string;
  source: {
    id: string;
    name: string;
  };
};
