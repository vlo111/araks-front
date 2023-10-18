export type LayoutType = 'radial' | 'concentric' | 'grid' | 'circular';

type ILayoutParams = { [key: string]: string | boolean | number | number[] };

export interface LayoutConfig {
  radial: ILayoutParams;
  concentric: ILayoutParams;
  grid: ILayoutParams;
  circular: ILayoutParams;
}
