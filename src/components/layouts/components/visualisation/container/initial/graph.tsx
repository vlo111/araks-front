import { Graph } from '@antv/g6';
import { InitGraph } from '../../types';
import { initGraphEvents } from './events';
import { options } from '../../helpers/constants';
import { contextMenuPlugin } from '../../helpers/context-menu';
import { UserProjectRole } from 'api/types';

export const initGraph: InitGraph = (container, params, projectInfo) => {
  const optionWithPermission = {
    ...options,
  };

  const isEdit = projectInfo?.role === UserProjectRole.Owner || projectInfo?.role === UserProjectRole.Editor;

  if (!isEdit) {
    optionWithPermission.modes.default.shift();
  }

  const graph = new Graph({
    container,
    ...optionWithPermission,
  });

  initGraphEvents(graph, params);

  graph.addPlugin(contextMenuPlugin(graph, params, isEdit));

  return graph;
};
