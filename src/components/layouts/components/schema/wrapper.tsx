import React, { useCallback, useMemo, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import { Graph, LinkPropertyModal, OpenAddType, PortModal, SchemaContextType, SelectedNode, SetGraph } from './types';

export const SchemaWrapper: React.FC = () => {
  const [graph, setGraphState] = useState<Graph>();

  const [selectedNode, setSelectedNode] = useState<SelectedNode>();

  const [addPortModal, setAddPortModal] = useState<PortModal>(false);

  const [openAddType, setOpenAddType] = useState<OpenAddType>(false);

  const [openLinkPropertyModal, setOpenLinkPropertyModal] = useState<LinkPropertyModal>(false);

  const setGraph = useCallback<SetGraph>((item) => setGraphState(item), []);

  const context = useMemo(
    () => ({
      graph,
      addPortModal,
      openLinkPropertyModal,
      selectedNode,
      openAddType,
      setGraph,
      setOpenAddType,
      setAddPortModal,
      setSelectedNode,
      setOpenLinkPropertyModal,
    }),
    [graph, addPortModal, openLinkPropertyModal, selectedNode, openAddType, setGraph]
  );

  return <Outlet context={context} />;
};

export const useSchema: () => SchemaContextType = () => useOutletContext<SchemaContextType>();
