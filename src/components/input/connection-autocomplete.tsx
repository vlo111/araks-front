import { AutoComplete } from 'antd';
import { useGetConnectionSourceSearch } from 'api/node/use-get-connection-sources-search';
import { SearchPageParameters } from 'api/types';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'helpers/constants';
import { useState } from 'react';
import { ConnectionSourcesSearchResult } from 'types/node';
import { useDebounce } from 'use-debounce';
import { Input } from '.';

type Props = {
  handleSelect: (value: string, options: ConnectionSourcesSearchResult[]) => void;
  targetId: string;
  placeholder?: string;
};

const initPageData: SearchPageParameters = { page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE };

export const ConnectionAutocomplete = ({ handleSelect, targetId, placeholder = 'Search' }: Props) => {
  const [pageData] = useState(initPageData);
  const [initalRequest, setStartInitialRequest] = useState(false);

  const [options, setOptions] = useState<ConnectionSourcesSearchResult[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
    initalRequest && setStartInitialRequest(false);
  };
  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  useGetConnectionSourceSearch(
    { ...pageData, search: debouncedSearchValue, ...(initalRequest ? { size: 5 } : {}) },
    targetId,
    {
      enabled: !!(debouncedSearchValue && debouncedSearchValue.length > 2) || initalRequest,
      onSuccess: (data) => {
        setOptions(data.rows);
      },
    }
  );

  const handleSelectAction = (value: string) => {
    handleSelect(value, options);
    setSearchValue('');
    setOptions([]);
    initalRequest && setStartInitialRequest(false);
  };

  return (
    <AutoComplete
      options={options?.map((row) => ({ value: row.id, label: row.name }))}
      onSearch={handleSearch}
      value={searchValue}
      open={!!options.length}
      onSelect={handleSelectAction}
      notFoundContent="No Connection data found"
      style={{ width: '100%' }}
    >
      <Input
        onFocus={() => !options.length && !debouncedSearchValue && setStartInitialRequest(true)}
        placeholder={placeholder}
      />
    </AutoComplete>
  );
};
