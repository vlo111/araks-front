export type LayoutType = 'radial' | 'concentric' | 'grid' | 'circular';

export interface LayoutConfig {
  radial: {
    type: string;
    center: [number, number];
    linkDistance: number;
    nodeStrength: number;
    edgeStrength: number;
    nodeSize: number;
    workerEnabled: boolean;
    gpuEnabled: boolean;
  };
  concentric: {
    maxLevelDiff: number;
    sortBy: string;
    edgeLength: number;
    preventOverlap: boolean;
    nodeSize: number;
  };
  grid: {
    begin: [number, number];
    preventOverlap: boolean;
    preventOverlapPadding: number;
    nodeSize: number;
    condense: boolean;
    rows: number;
    cols: number;
    sortBy: string;
    workerEnabled: boolean;
  };
  circular: {
    ordering: string;
  };
}
