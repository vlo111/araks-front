import React from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchSVG } from 'components/icons/search.svg';
import { Input } from '../../../input';

const Wrapper = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(7px);
  border-radius: 4px;

  &.stretch {
    background: white;
    width: 400px;
    display: flex;
    align-items: center;

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
    background-color: rgba(255, 255, 255, 0.84);
  }
`;

interface Props {
  search: string | undefined;
  setSearch: (value: string) => void;
}

export const SearchUsers: React.FC<Props> = ({ setSearch, search }) => {
  return (
    <Wrapper className="stretch">
      <div className="search-button">
        <SearchSVG />
      </div>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search" />
    </Wrapper>
  );
};
