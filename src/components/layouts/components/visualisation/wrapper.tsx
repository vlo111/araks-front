import React, { useCallback, useMemo, useReducer } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Graph } from '@antv/g6';
import { GraphAction, graphInitialState, graphReducer } from './reducer/graph-manager';
import { VisualisationContextType } from './types';
import { IProjectType } from 'api/types';
import { INodeOpen, ProjectEdgeResponse } from 'types/project-edge';

export const VisualisationWrapper: React.FC = () => {
  const [state, dispatch] = useReducer(graphReducer, graphInitialState);

  const handleAction = useCallback((type: GraphAction, payload = {}) => dispatch({ type, payload }), [dispatch]);

  const callbacks = useMemo(
    () => ({
      setGraph: (payload: Graph) => handleAction(GraphAction.SET_GRAPH, payload),
      setNodes: (payload: IProjectType[]) => handleAction(GraphAction.SET_NODES, payload),
      setEdges: (payload: ProjectEdgeResponse[]) => handleAction(GraphAction.SET_EDGES, payload),
      startOpenNode: (payload: INodeOpen) => handleAction(GraphAction.OPEN_NODE_START, payload),
      finishOpenNode: () => handleAction(GraphAction.OPEN_NODE_FINISH),
    }),
    [handleAction]
  );

  const context = useMemo(() => ({ ...callbacks, ...state }), [callbacks, state]);

  return <Outlet context={context} />;
};

export const useGraph: () => VisualisationContextType = () => useOutletContext<VisualisationContextType>();
