import React, { useState } from 'react';
import styled from 'styled-components';

import { useSchema } from 'components/layouts/components/schema/wrapper';
import { AddLinkModal } from './modals/add-link/add-link';

import { ReactComponent as AddTypeSVG } from './icons/add.svg';
import { ReactComponent as SearchSVG } from './icons/search.svg';
import { ReactComponent as AddLinkSVG } from './icons/connection.svg';
import { AddTypeModal } from './modals/add-type';
import { AddTypePropertyModal } from './modals/add-type-property-modal';

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

  .add-link,
  .add-type {
    &:hover {
      rect:first-child {
        fill: rgba(35, 47, 106, 0.8);
      }
    }
  }
`;

export const ActionBar: React.FC = () => {
  const { graph } = useSchema() || {};

  const [openAddLink, setOpenAddLink] = useState(false);

  const addType: AddType = () => {
    graph.container.style.cursor = 'crosshair';
  };

  return (
    <>
      <ToolStyle>
        <SearchSVG />
        <AddTypeSVG className="add-type" onClick={addType} />
        <AddLinkSVG className="add-link" onClick={() => setOpenAddLink(true)} />
      </ToolStyle>
      <AddTypeModal />
      <AddLinkModal openAddLink={openAddLink} setOpenAddLink={setOpenAddLink} />
      <AddTypePropertyModal />
    </>
  );
};
