import React from 'react';
import styled from 'styled-components';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { AddTypeModal } from './modals/add-type';
import { AddTypePropertyModal } from './modals/add-type-property-modal';
import { ReactComponent as AddTypeSVG } from './icons/add.svg';
import { ReactComponent as AddLinkSVG } from './icons/connection.svg';
import { Search } from './search';

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
  const { graph } = useSchema() || {};

  const addType: VoidFunction = () => {
    graph.container.style.cursor = 'crosshair';
  };

  return (
    <>
      <ToolStyle>
        <Search />
        <AddTypeSVG className="add-type" onClick={addType} />
        <AddLinkSVG className="add-link" onClick={() => {return;}} />
      </ToolStyle>
      <AddTypeModal />
      <AddTypePropertyModal />
    </>
  );
};
