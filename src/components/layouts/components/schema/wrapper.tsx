import React, { useMemo, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import { Graph, LinkPropertyModal, OpenAddType, PortModal, SchemaContextType, SelectedNode } from './types';

export const SchemaWrapper: React.FC = () => {
  const [graph, setGraph] = useState<Graph>();

  const [selectedNode, setSelectedNode] = useState<SelectedNode>();

  const [addPortModal, setAddPortModal] = useState<PortModal>();

  const [openAddType, setOpenAddType] = useState<OpenAddType>();

  const [openLinkPropertyModal, setOpenLinkPropertyModal] = useState<LinkPropertyModal>();

  const isOpenPortModal = useMemo(() => addPortModal !== undefined, [addPortModal]);
  const isOpenTypeModal = useMemo(() => openAddType !== undefined, [openAddType]);
  const isOpenLikPropertyModal = useMemo(() => openLinkPropertyModal !== undefined, [openLinkPropertyModal]);

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
      isOpenPortModal,
      isOpenTypeModal,
      isOpenLikPropertyModal,
    }),
    [
      graph,
      addPortModal,
      openLinkPropertyModal,
      selectedNode,
      openAddType,
      setGraph,
      isOpenPortModal,
      isOpenTypeModal,
      isOpenLikPropertyModal,
    ]
  );

  return <Outlet context={context} />;
};

export const useSchema: () => SchemaContextType = () => useOutletContext<SchemaContextType>();
