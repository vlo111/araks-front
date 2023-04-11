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
import { AutoComplete } from "antd";

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

  .search {
    border: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(7px);
    border-radius: 4px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%);
    transition: width 0.2s ease, height 0.2s ease, transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 0.1),
      -webkit-transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 0.1);

    &.stretch {
      width: 400px;

      .ant-select {
        position: absolute;
        visibility: initial;
        width: 90%;
        height: 100%;
        left: 30px;
        top: 0;
      }
      
      .ant-input {
        background: none;
        border: none;
        height: 100%;
      }
      
      .ant-select-selector {
        height: 100%;
      }
    }

    .search-button {
      padding-left: 7px;
      height: 40px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .ant-select {
      visibility: hidden;
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

// const renderTitle = (title: string) => (
//   <span>
//     {title}
//     <a style={{ float: 'right' }} href="https://www.google.com/search?q=antd" target="_blank" rel="noopener noreferrer">
//       more
//     </a>
//   </span>
// );

const renderItem = (title: string, count: number) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {title}
      <span>
       {count}
      </span>
    </div>
  ),
});

export const ActionBar: React.FC = () => {
  const { graph } = useSchema() || {};

  const [openAddLink, setOpenAddLink] = useState(false);

  const [stretchSearch, setStretchSearch] = useState(false);

  const [search, setSearch] = useState<string>();

  const addType: VoidFunction = () => {
    graph.container.style.cursor = 'crosshair';
  };

  const handleSearch: VoidFunction = () => {
    setStretchSearch(!stretchSearch)
    setTimeout(() => setSearch(''), 0);
  };

  return (
    <>
      <ToolStyle>
        <div className={`search ${stretchSearch ? 'stretch' : ''}`}>
          <div className="search-button" onClick={handleSearch}>
            <SearchSVG />
          </div>
          {stretchSearch && <AutoComplete
            popupClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={400}
            dropdownStyle={{ left: 330, top: 228, backdropFilter: 'blur(7px)', background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)' }}
            style={{ width: 400 }}
            options={[
              {
                label: <span style={{fontWeight: 800, fontSize: 18, color: '#000000b5' }}>Node Types</span>,
                options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
              },
            ]}
          >
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search"/>
          </AutoComplete>}
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
