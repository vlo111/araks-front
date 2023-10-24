import { Graph } from '@antv/g6';
import { InitGraph } from '../../types';
import { initGraphEvents } from './events';
import { options } from '../../helpers/constants';
import { contextMenuPlugin } from '../../helpers/context-menu';
import { UserProjectRole } from 'api/types';
import { PATHS } from 'helpers/constants';

export const initGraph: InitGraph = (container, params, projectInfo) => {
  const isOwner = projectInfo?.role === UserProjectRole.Owner;

  const isEdit = isOwner || projectInfo?.role === UserProjectRole.Editor;

  const showShortestPath = isOwner || location.pathname.startsWith(PATHS.PUBLIC_PREFIX);

  const graph = new Graph({
    container,
    ...options,
  });

  if (!isEdit) graph?.removeBehaviors('create-edge', 'default');

  initGraphEvents(graph, params);

  graph.addPlugin(contextMenuPlugin(graph, params, isEdit, showShortestPath));

  return graph;
};
