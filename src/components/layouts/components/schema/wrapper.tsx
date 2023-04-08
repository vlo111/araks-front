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
import { TreeNodeType } from '../../../../pages/data-sheet/types';

export const SchemaWrapper: React.FC = () => {
  const [graph, setGraph] = useState<Graph>();
  /** String Type ID. Set the selected type that was created */
  const [selectedNode, setSelectedNode] = useState<SelectedNode>();
  const [nodesTree, setNodesTree] = useState<TreeNodeType[]>();

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
      nodesTree,
      addPortModal,
      addTypeModal,
      openLinkPropertyModal,
      setGraph,
      setSelectedNode,
      setNodesTree,
      setAddTypeModal,
      setAddPortModal,
      setOpenLinkPropertyModal,
    }),
    [graph, selectedNode, nodesTree, addPortModal, addTypeModal, openLinkPropertyModal, setAddTypeModal]
  );

  return <Outlet context={context} />;
};

export const useSchema: () => SchemaContextType = () => useOutletContext<SchemaContextType>();
