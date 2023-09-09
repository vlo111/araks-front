import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchSVG } from 'components/icons/search.svg';
import { AutoComplete } from './auto-complete';

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

export const Search: React.FC = () => {
  const [stretchSearch, setStretchSearch] = useState(false);

  const [search, setSearch] = useState<string>();

  const handleSearch: VoidFunction = () => {
    setStretchSearch(!stretchSearch);
    setTimeout(() => setSearch(''), 0);
  };

  return (
    <Wrapper className={`${stretchSearch ? 'stretch' : ''}`}>
      <div className="search-button" onClick={handleSearch}>
        <SearchSVG />
      </div>
      {stretchSearch && <AutoComplete search={search} setSearch={setSearch} />}
    </Wrapper>
  );
};
