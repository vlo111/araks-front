import { Graph } from '@antv/g6';
import { InitGraph } from '../../types';
import { initGraphEvents } from './events';
import { options } from '../../helpers/constants';
import { contextMenuPlugin } from '../../helpers/context-menu';
import { UserProjectRole } from 'api/types';

export const initGraph: InitGraph = (container, params, projectInfo) => {
  const isEdit = projectInfo?.role === UserProjectRole.Owner || projectInfo?.role === UserProjectRole.Editor;

  const graph = new Graph({
    container,
    ...options,
  });

  if (!isEdit) graph?.removeBehaviors('create-edge', 'default');

  initGraphEvents(graph, params);

  graph.addPlugin(contextMenuPlugin(graph, params, isEdit));

  return graph;
};
