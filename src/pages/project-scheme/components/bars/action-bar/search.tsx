import React, { useState } from 'react';
import { AutoComplete, Badge } from 'antd';
import styled from 'styled-components';
import { Input } from 'components/input';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { selectNodeWithZoom } from 'components/layouts/components/schema/helpers/utils';
import { ReactComponent as SearchSVG } from './icons/search.svg';

const StyledBadge = styled(Badge)`
  && {
    .ant-badge-status-dot {
      height: 16px;
      width: 16px;
    }
  }
`;

const Wrapper = styled.div`
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
`;

const renderTypes = (title: string, color: string) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <StyledBadge color={color} text={title} />
    </div>
  ),
});

export const Search: React.FC = () => {
  const { graph, selectedNode, setSelectedNode, nodes } = useSchema() || {};

  const [stretchSearch, setStretchSearch] = useState(false);

  const [search, setSearch] = useState<string>();

  const handleSearch: VoidFunction = () => {
    setStretchSearch(!stretchSearch);
    setTimeout(() => setSearch(''), 0);
  };

  const onSelect = (name: string) => {
    selectNodeWithZoom(nodes.find((n) => n.name === name)?.id ?? '', graph, selectedNode, setSelectedNode);
  };

  return (
    <Wrapper className={`${stretchSearch ? 'stretch' : ''}`}>
      <div className="search-button" onClick={handleSearch}>
        <SearchSVG />
      </div>
      {stretchSearch && (
        <AutoComplete
          popupClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={400}
          dropdownStyle={{
            left: 330,
            top: 228,
            backdropFilter: 'blur(7px)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)',
          }}
          style={{ width: 400 }}
          onSelect={onSelect}
          filterOption={(inputValue, option) =>
            option!.value === '#types_key#'
              ? true
              : option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          options={[
            {
              label: <span style={{ fontWeight: 800, fontSize: 18, color: '#000000b5' }}>Types</span>,
              value: '#types_key#',
            },
            ...nodes.map((n) => renderTypes(n.name, n.color)),
          ]}
        >
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search" />
        </AutoComplete>
      )}
    </Wrapper>
  );
};
