import React, { useCallback, useMemo, useReducer } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { SchemaContextType } from './types';
import { IProjectType } from 'api/types';
import { Graph } from '@antv/x6';
import { ProjectEdgeResponse } from 'types/project-edge';
import { SchemaAction, schemaInitialState, schemaReducer } from './reducer/schema-manager';
import { IEdgePortState, IEdgeState, IPerspectiveState, ITypePortState, ITypeState } from './reducer/types';

export const SchemaWrapper: React.FC = () => {
  const [state, dispatch] = useReducer(schemaReducer, schemaInitialState);

  const handleAction = useCallback((type: SchemaAction, payload = {}) => dispatch({ type, payload }), [dispatch]);

  const callbacks = useMemo(
    () => ({
      setGraph: (payload: Graph) => handleAction(SchemaAction.SET_GRAPH, payload),
      setNodes: (payload: IProjectType[]) => handleAction(SchemaAction.SET_NODES, payload),
      setEdges: (payload: ProjectEdgeResponse[]) => handleAction(SchemaAction.SET_EDGES, payload),
      setSelected: (payload: ProjectEdgeResponse[]) => handleAction(SchemaAction.SET_SELECT_NODE, payload),
      startEdgeType: (payload: IEdgeState) => handleAction(SchemaAction.ADD_EDGE_START, payload),
      startType: (payload: ITypeState) => handleAction(SchemaAction.ADD_TYPE_START, payload),
      startTypePort: (payload: ITypePortState) => handleAction(SchemaAction.ADD_TYPE_PORT_START, payload),
      startEdgePort: (payload: IEdgePortState) => handleAction(SchemaAction.ADD_EDGE_PORT_START, payload),
      finishEdgeType: () => handleAction(SchemaAction.ADD_EDGE_FINISH),
      finishType: () => handleAction(SchemaAction.ADD_TYPE_FINISH),
      finishTypePort: () => handleAction(SchemaAction.ADD_TYPE_PORT_FINISH),
      finishEdgePort: () => handleAction(SchemaAction.ADD_EDGE_PORT_FINISH),
      startPerspectiveShare: (payload: IPerspectiveState) =>
        handleAction(SchemaAction.SET_PERSPECTIVE_SHARE_START, payload),
      finishPerspectiveShare: () => handleAction(SchemaAction.SET_PERSPECTIVE_SHARE_FINISH),
    }),
    [handleAction]
  );

  const context = useMemo(() => ({ ...callbacks, ...state }), [callbacks, state]);

  return <Outlet context={context} />;
};

export const useSchema: () => SchemaContextType = () => useOutletContext<SchemaContextType>();
