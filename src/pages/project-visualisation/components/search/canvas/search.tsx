import React, { useState } from 'react';
import { AutoComplete } from './auto-complete';
import { SearchVisualization } from '../wrapper';
import { Spinning } from 'components/spinning';

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
      {!!isEnterSearch && <Spinning />}
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
