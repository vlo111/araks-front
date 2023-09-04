import React, { useCallback, useMemo, useReducer } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Graph } from '@antv/g6';
import { GraphAction, graphInitialState, graphReducer } from './reducer/graph-manager';
import { VisualisationContextType } from './types';
import { IOpenEdge, IOpenId } from 'types/project-edge';
import { IIdOpen } from './reducer/types';

export const VisualisationWrapper: React.FC = () => {
  const [state, dispatch] = useReducer(graphReducer, graphInitialState);

  const handleAction = useCallback((type: GraphAction, payload = {}) => dispatch({ type, payload }), [dispatch]);

  const callbacks = useMemo(
    () => ({
      setGraph: (payload: Graph) => handleAction(GraphAction.SET_GRAPH, payload),
      startOpenNode: (payload: IOpenId) => handleAction(GraphAction.OPEN_NODE_START, payload),
      finishOpenNode: () => handleAction(GraphAction.OPEN_NODE_FINISH),
      startDeleteNode: (payload: IOpenId) => handleAction(GraphAction.DELETE_NODE_START, payload),
      finishDeleteNode: () => handleAction(GraphAction.DELETE_NODE_FINISH),
      startOpenNodeCreate: (payload: IIdOpen) => handleAction(GraphAction.OPEN_CREATE_NODE_START, payload),
      finishOpenNodeCreate: () => handleAction(GraphAction.OPEN_CREATE_NODE_FINISH),
      startOpenEdge: (payload: IIdOpen) => handleAction(GraphAction.OPEN_EDGE_START, payload),
      finishOpenEdge: () => handleAction(GraphAction.OPEN_EDGE_FINISH),
      startDeleteEdge: (payload: IOpenId) => handleAction(GraphAction.DELETE_EDGE_START, payload),
      finishDeleteEdge: () => handleAction(GraphAction.DELETE_EDGE_FINISH),
      startOpenEdgeCreate: (payload: IOpenEdge) => handleAction(GraphAction.OPEN_CREATE_EDGE_START, payload),
      finishOpenEdgeCreate: () => handleAction(GraphAction.OPEN_CREATE_EDGE_FINISH),
    }),
    [handleAction]
  );

  const context = useMemo(() => ({ ...callbacks, ...state }), [callbacks, state]);

  return <Outlet context={context} />;
};

export const useGraph: () => VisualisationContextType = () => useOutletContext<VisualisationContextType>();
