import React, { createContext, useContext, useMemo, useState } from 'react';
import { Graph } from '@antv/x6';

import {
  IComponentChildren,
  LinkPropertyModal,
  OpenAddType,
  PortModal,
  SchemaContextType,
  SelectedNode,
  SetGraph,
} from '../types/provider';

const defaultValue = {
  graph: {},
  addPortModal: false,
  openLinkPropertyModal: false,
  selectedNode: false,
  openAddType: false,
  setGraph: () => {
    return;
  },
  setOpenAddType: () => {
    return;
  },
  setAddPortModal: () => {
    return;
  },
  setSelectedNode: () => {
    return;
  },
  setOpenLinkPropertyModal: () => {
    return;
  },
};

const SchemaContext = createContext<SchemaContextType>(defaultValue);

export const SchemaProvider: React.FC<IComponentChildren> = ({ children }) => {
  const [graph, setGraphState] = useState({});

  const [selectedNode, setSelectedNode] = useState<SelectedNode>();

  const [addPortModal, setAddPortModal] = useState<PortModal>(false);

  const [openAddType, setOpenAddType] = useState<OpenAddType>(false);

  const [openLinkPropertyModal, setOpenLinkPropertyModal] = useState<LinkPropertyModal>(false);

  const setGraph: SetGraph = (item: Graph) => {
    setGraphState(item);
  };

  const value = useMemo(
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
    [graph, addPortModal, openLinkPropertyModal, selectedNode, openAddType]
  );

  return <SchemaContext.Provider value={value}>{children}</SchemaContext.Provider>;
};

export const useSchema: () => SchemaContextType = () => useContext(SchemaContext);
