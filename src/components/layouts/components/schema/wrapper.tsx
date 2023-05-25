import React, { useCallback, useMemo, useReducer, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Graph, SchemaContextType, SelectedNode } from './types';
import { IProjectType } from 'api/types';
import { ProjectEdgeResponse } from 'types/project-edge';
import { SchemaAction, schemaInitialState, schemaReducer } from './reducer/schema-manager';
import { IEdgePortState, IEdgeState, ITypePortState, ITypeState } from './reducer/types';

export const SchemaWrapper: React.FC = () => {
  const [state, dispatch] = useReducer(schemaReducer, schemaInitialState);

  const handleAction = useCallback((type: SchemaAction, payload = {}) => dispatch({ type, payload }), [dispatch]);

  const callbacks = useMemo(
    () => ({
      startEdgeType: (payload: IEdgeState) => handleAction(SchemaAction.ADD_EDGE_START, payload),
      startType: (payload: ITypeState) => handleAction(SchemaAction.ADD_TYPE_START, payload),
      startTypePort: (payload: ITypePortState) => handleAction(SchemaAction.ADD_TYPE_PORT_START, payload),
      startEdgePort: (payload: IEdgePortState) => handleAction(SchemaAction.ADD_EDGE_PORT_START, payload),

      finishEdgeType: () => handleAction(SchemaAction.ADD_EDGE_FINISH),
      finishType: () => handleAction(SchemaAction.ADD_TYPE_FINISH),
      finishTypePort: () => handleAction(SchemaAction.ADD_TYPE_PORT_FINISH),
      finishEdgePort: () => handleAction(SchemaAction.ADD_EDGE_PORT_FINISH),
    }),
    [handleAction]
  );

  const [graph, setGraph] = useState<Graph>();
  /** String Type ID. Set the selected type that was created */
  const [selectedNode, setSelectedNode] = useState<SelectedNode>();
  const [nodes, setNodes] = useState<IProjectType[]>();
  const [edges, setEdges] = useState<ProjectEdgeResponse[]>();

  const context = useMemo(
    () => ({
      graph,
      selectedNode,
      nodes,
      edges,
      setGraph,
      setSelectedNode,
      setNodes,
      setEdges,
      ...callbacks,
      ...state,
    }),
    [callbacks, graph, selectedNode, nodes, edges, state]
  );

  return <Outlet context={context} />;
};

export const useSchema: () => SchemaContextType = () => useOutletContext<SchemaContextType>();
