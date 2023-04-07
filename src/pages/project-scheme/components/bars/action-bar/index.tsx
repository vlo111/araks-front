import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from 'components/input';
import { useSchema } from 'components/layouts/components/schema/wrapper';

import { AddTypeModal } from './modals/add-type';
import { AddLinkModal } from './modals/add-link/add-link';
import { AddTypePropertyModal } from './modals/add-type-property-modal';

import { ReactComponent as AddTypeSVG } from './icons/add.svg';
import { ReactComponent as SearchSVG } from './icons/search.svg';
import { ReactComponent as AddLinkSVG } from './icons/connection.svg';

const ToolStyle = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 8px;
  left: 280px;
  top: 188px;
  z-index: 1;

  > * {
    width: 40px;
    height: 40px;
    box-shadow: 0px 10px 10px rgba(141, 143, 166, 0.2);
  }

  .search {
    border: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(7px);
    border-radius: 4px;
    transition: width 0.2s ease, height 0.2s ease, transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 0.1),
      -webkit-transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 0.1);

    &.stretch {
      width: 400px;

      .ant-input {
        visibility: initial;
        background: none;
        border: none;
        height: 100%;
        width: 90%;
        top: 0;
      }
    }

    .search-button {
      padding-left: 7px;
      height: 40px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .ant-input {
      visibility: hidden;
      background: none;
      border: none;
      height: 100%;
      width: 90%;
      position: absolute;
      left: 30px;
    }

    &:hover {
      background-color: #eaeaea;
    }
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

  const [openAddLink, setOpenAddLink] = useState(false);

  const [stretchSearch, setStretchSearch] = useState(false);

  const [search, setSearch] = useState<string>();

  const addType: VoidFunction = () => {
    graph.container.style.cursor = 'crosshair';
  };

  const handleSearch: VoidFunction = () => {
    setSearch('');
    setStretchSearch(!stretchSearch);
  };

  return (
    <>
      <ToolStyle>
        <div className={`search ${stretchSearch ? 'stretch' : ''}`}>
          <div className="search-button" onClick={handleSearch}>
            <SearchSVG />
          </div>
          <Input value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <AddTypeSVG className="add-type" onClick={addType} />
        <AddLinkSVG className="add-link" onClick={() => setOpenAddLink(true)} />
      </ToolStyle>
      <AddTypeModal />
      <AddLinkModal openAddLink={openAddLink} setOpenAddLink={setOpenAddLink} />
      <AddTypePropertyModal />
    </>
  );
};
