import React, { useState } from 'react';
import { AutoComplete } from './auto-complete';
import { SearchVisualization } from '../wrapper';
import { Spin } from 'antd';
import styled from 'styled-components';

const Spinning = styled(Spin)`
  position: fixed;
  left: 0;
  top: 150px;
  width: 100% !important;
  height: calc(100% - 150px) !important;
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Search: React.FC<{ collapsed?: boolean }> = ({ collapsed }) => {
  const [stretchSearch, setStretchSearch] = useState(false);

  const [isEnterSearch, setIsEnterSearch] = useState('');

  const [search, setSearch] = useState<string>();

  const handleSearch: VoidFunction = () => {
    setStretchSearch(!stretchSearch);
    setTimeout(() => setSearch(''), 0);
  };

  return (
    <>
      {!!isEnterSearch && <Spinning spinning={true} />}
      <SearchVisualization className={`${stretchSearch ? 'stretch' : ''}`} handleSearch={handleSearch}>
        {stretchSearch && (
          <AutoComplete
            search={search}
            collapsed={collapsed}
            setSearch={setSearch}
            isEnterSearch={isEnterSearch}
            setIsEnterSearch={setIsEnterSearch}
          />
        )}
      </SearchVisualization>
    </>
  );
};
