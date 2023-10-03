import React, { useState } from 'react';
import { AutoComplete } from './auto-complete';
import { SearchVisualization } from '../wrapper';

export const Search: React.FC = () => {
  const [stretchSearch, setStretchSearch] = useState(false);

  const [isEnterSearch, setIsEnterSearch] = useState('');

  const [search, setSearch] = useState<string>();

  const handleSearch: VoidFunction = () => {
    setStretchSearch(!stretchSearch);
    setTimeout(() => setSearch(''), 0);
  };

  return (
    <>
      <SearchVisualization className={`${stretchSearch ? 'stretch' : ''}`} handleSearch={handleSearch}>
        {stretchSearch && (
          <AutoComplete
            search={search}
            setSearch={setSearch}
            isEnterSearch={isEnterSearch}
            setIsEnterSearch={setIsEnterSearch}
          />
        )}
      </SearchVisualization>
    </>
  );
};
