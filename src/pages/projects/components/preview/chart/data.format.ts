import { ProjectFullInfo } from '../../../../../api/types';

export const PreviewEdgeFormat = (edges: ProjectFullInfo['projectsEdgeTypes']) => {
  if (edges?.length) {
    return edges?.map((edge) => {
      return {
        id: edge.id,
        source: edge.source_id,
        target: edge.target_id,
        label: edge.name,
      };
    });
  } else return [];
};
