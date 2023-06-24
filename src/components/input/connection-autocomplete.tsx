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
};

const initPageData: SearchPageParameters = { page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE };

export const ConnectionAutocomplete = ({ handleSelect, targetId }: Props) => {
  const [pageData] = useState(initPageData);

  const [options, setOptions] = useState<ConnectionSourcesSearchResult[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  useGetConnectionSourceSearch({ ...pageData, search: debouncedSearchValue }, targetId, {
    enabled: !!(debouncedSearchValue && debouncedSearchValue.length > 2),
    onSuccess: (data) => {
      setOptions(data);
    },
  });

  const handleSelectAction = (value: string) => {
    handleSelect(value, options);
    setSearchValue('');
    setOptions([]);
  };

  return (
    <AutoComplete
      options={options?.map((row) => ({ value: row.node_id, label: row.node_name.join(',') }))}
      onSearch={handleSearch}
      value={searchValue}
      open={!!options.length}
      onSelect={handleSelectAction}
      notFoundContent="No Connection data found"
    >
      <Input />
    </AutoComplete>
  );
};
