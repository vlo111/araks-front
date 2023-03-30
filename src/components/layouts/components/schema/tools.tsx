import React, { useState } from 'react';
import styled from 'styled-components';

import { useSchema } from './provider';
import { AddTypeModal } from './modals/add-type';
import { AddLinkModal } from './modals/add-link/add-link';
import { AddTypePropertyModal } from './modals/add-type-property';
import { AddLinkPropertyModal } from './modals/add-link-property';

import { ReactComponent as AddTypeSVG } from './icons/add.svg';
import { ReactComponent as SearchSVG } from './icons/search.svg';
import { ReactComponent as AddLinkSVG } from './icons/connection.svg';
import { Graph } from "@antv/x6";

type AddType = () => void;

const ToolStyle = styled.div`
  position: absolute;
  width: 40px;
  height: 136px;
  z-index: 2;
  left: 280px;
  top: 30px;

  svg {
    cursor: pointer;
    box-shadow: 0px 10px 10px rgba(141, 143, 166, 0.2);
  }
  
  .add-link, .add-type {
    &:hover {
      rect:first-child {
        fill: rgba(35, 47, 106, 0.8)
      }
    }
  }
`;

export const Tools: React.FC = () => {
  const { graph, openAddType, setOpenAddType } = useSchema();

  const [openAddLink, setOpenAddLink] = useState<boolean>(false);

  const addType: AddType = () => {
    if (graph instanceof Graph) {
      graph.container.style.cursor = "crosshair";
    }
  };

  return (
    <>
      <ToolStyle>
        <SearchSVG />
        <AddTypeSVG className="add-type" onClick={addType} />
        <AddLinkSVG className="add-link" onClick={() => setOpenAddLink(true)} />
      </ToolStyle>
      <AddTypeModal openAddType={openAddType} setOpenAddType={setOpenAddType} />
      <AddLinkModal openAddLink={openAddLink} setOpenAddLink={setOpenAddLink} />
      <AddTypePropertyModal />
      <AddLinkPropertyModal />
    </>
  );
};
