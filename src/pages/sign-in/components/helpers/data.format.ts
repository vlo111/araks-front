import { AllDataHelp } from '../../../../types/node';
import { HelpEdgeType, HelpNodeType } from '../type';

export const DataFormat = (graphData: AllDataHelp[]) => {
  const nodes: HelpNodeType[] = [];
  const edges: HelpEdgeType[] = [];
  graphData.forEach((item: AllDataHelp) => {
    nodes.push({
      id: item.id,
      style: {
        fill: item.color,
      },
      label: item.name,
      size: item.size,
      x: item.fx,
      y: item.fy,
    });
    item.target.forEach((edge) => {
      edges.push({
        id: edge.id,
        source: edge.source_id,
        target: edge.target_id,
      });
    });
  });
  return { nodes, edges };
};
