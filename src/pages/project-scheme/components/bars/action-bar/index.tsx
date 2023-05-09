import React from 'react';
import styled from 'styled-components';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { AddTypeModal } from './modals/add-type';
import { AddTypePropertyModal } from './modals/add-type-property';
import { ReactComponent as AddTypeSVG } from './icons/add.svg';
import { ReactComponent as AddLinkSVG } from './icons/connection.svg';
import { Search } from './search';
import { AddEdgeModal } from './modals/add-edge';
import { AddEdgePropertyModal } from './modals/edge-properties/list-edge-properties/modal';

const ToolStyle = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 8px;
  left: 330px;
  top: 188px;
  z-index: 1;

  > * {
    width: 40px;
    height: 40px;
    box-shadow: 0px 10px 10px rgba(141, 143, 166, 0.2);
  }

  .add-type,
  .add-link {
    cursor: pointer;

    &:hover {
      rect:first-child {
        fill: rgba(35, 47, 106, 0.8);
      }
    }
  }
`;

export const ActionBar: React.FC = () => {
  const { graph, setAddLinkModal } = useSchema() || {};

  return (
    <>
      <ToolStyle>
        <Search />
        <AddTypeSVG className="add-type" onClick={() => (graph.container.style.cursor = 'crosshair')} />
        <AddLinkSVG className="add-link" onClick={() => setAddLinkModal(true)} />
      </ToolStyle>
      <AddEdgeModal />
      <AddEdgePropertyModal />
      <AddTypeModal />
      <AddTypePropertyModal />
    </>
  );
};
