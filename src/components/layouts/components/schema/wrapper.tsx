import React, { useCallback, useMemo, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import {
  Graph,
  LinkPropertyModal,
  OpenAddType,
  OpenTypeModal,
  PortModal,
  SchemaContextType,
  SelectedNode,
} from './types';

export const SchemaWrapper: React.FC = () => {
  const [graph, setGraph] = useState<Graph>();
  const [selectedNode, setSelectedNode] = useState<SelectedNode>();

  const [addPortModal, setAddPortModal] = useState<PortModal>();
  const [addTypeModal, openTypeModal] = useState<OpenAddType>();
  const [openLinkPropertyModal, setOpenLinkPropertyModal] = useState<LinkPropertyModal>();

  const setAddTypeModal: OpenTypeModal = useCallback(
    (param) => {
        openTypeModal(param);
      if (graph !== undefined) graph.container.style.cursor = '';
    },
    [graph]
  );

  const context = useMemo(
    () => ({
      graph,
      selectedNode,
      addPortModal,
      addTypeModal,
      openLinkPropertyModal,
      setGraph,
      setAddTypeModal,
      setAddPortModal,
      setSelectedNode,
      setOpenLinkPropertyModal,
    }),
    [graph, selectedNode, addPortModal, openLinkPropertyModal, addTypeModal, setAddTypeModal]
  );

  return <Outlet context={context} />;
};

export const useSchema: () => SchemaContextType = () => useOutletContext<SchemaContextType>();
