import React, { useCallback, useMemo, useReducer } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Graph } from '@antv/g6';
import { GraphAction, graphInitialState, graphReducer } from './reducer/graph-manager';
import { VisualisationContextType } from "./types";

export const VisualisationWrapper: React.FC = () => {
  const [state, dispatch] = useReducer(graphReducer, graphInitialState);

  const handleAction = useCallback((type: GraphAction, payload = {}) => dispatch({ type, payload }), [dispatch]);

  const callbacks = useMemo(
    () => ({
      setGraph: (payload: Graph) => handleAction(GraphAction.SET_GRAPH, payload),
    }),
    [handleAction]
  );

  const context = useMemo(() => ({ ...callbacks, ...state }), [callbacks, state]);

  return <Outlet context={context} />;
};

export const useGraph: () => VisualisationContextType = () => useOutletContext<VisualisationContextType>();
