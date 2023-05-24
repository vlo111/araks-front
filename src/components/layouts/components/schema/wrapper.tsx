import React, { useCallback, useMemo, useReducer, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Graph, LinkPropertyModal, SchemaContextType, SelectedNode } from './types';
import { IProjectType } from 'api/types';
import { ProjectEdgeResponse } from 'types/project-edge';
import { SchemaAction, schemaInitialState, schemaReducer } from './reducer/schema-manager';
import { IEdgeState, IPortState, ITypeState } from './reducer/types';

export const SchemaWrapper: React.FC = () => {
  const [state, dispatch] = useReducer(schemaReducer, schemaInitialState);

  const handleAction = useCallback((type: SchemaAction, payload = {}) => dispatch({ type, payload }), [dispatch]);

  const callbacks = useMemo(
    () => ({
      startEdgeType: (payload: IEdgeState) => handleAction(SchemaAction.ADD_EDGE_START, payload),
      startType: (payload: ITypeState) => handleAction(SchemaAction.ADD_TYPE_START, payload),
      startPort: (payload: IPortState) => handleAction(SchemaAction.ADD_PORT_START, payload),
      finishEdgeType: () => handleAction(SchemaAction.ADD_EDGE_FINISH),
      finishType: () => handleAction(SchemaAction.ADD_TYPE_FINISH),
      finishPort: () => handleAction(SchemaAction.ADD_PORT_FINISH),
    }),
    [handleAction]
  );

  const [graph, setGraph] = useState<Graph>();
  /** String Type ID. Set the selected type that was created */
  const [selectedNode, setSelectedNode] = useState<SelectedNode>();
  const [nodes, setNodes] = useState<IProjectType[]>();
  const [edges, setEdges] = useState<ProjectEdgeResponse[]>();

  const [openLinkPropertyModal, setOpenLinkPropertyModal] = useState<LinkPropertyModal>();

  const context = useMemo(
    () => ({
      graph,
      selectedNode,
      nodes,
      edges,
      openLinkPropertyModal,
      setGraph,
      setSelectedNode,
      setNodes,
      setEdges,
      setOpenLinkPropertyModal,
      ...callbacks,
      ...state,
    }),
    [callbacks, graph, selectedNode, nodes, edges, openLinkPropertyModal, state]
  );

  return <Outlet context={context} />;
};

export const useSchema: () => SchemaContextType = () => useOutletContext<SchemaContextType>();
