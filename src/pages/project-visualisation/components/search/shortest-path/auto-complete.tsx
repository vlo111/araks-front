import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { AutoComplete as AntAutoComplete } from 'antd';
import { Input } from 'components/input';
import { FilterFunc } from 'rc-select/lib/Select';
import { useGetSearchData } from 'api/visualisation/use-get-search';
import { NodePropertyItem, StyledBadge } from '../canvas/options/styles';
import { getHighlightedText } from '../canvas/options/utils';

type FilterOption = boolean | FilterFunc<{ id: string; key: string; value: string; label: JSX.Element }> | undefined;

type Props = React.FC<{
  setEnd: Dispatch<SetStateAction<string | undefined>>;
  search: string | undefined;
  setSearch: (search: string) => void;
}>;

export const AutoCompleteShortest: Props = ({ setEnd, search, setSearch }) => {
  const { data } = useGetSearchData({ enabled: search ? search.trim()?.length > 2 : false }, search?.trim() ?? '');

  const onSelect = (value: string) => {
    setSearch(search ?? '');
    setEnd(value);
  };

  const options = useMemo(() => {
    const nodes = data.nodeProperties?.filter((node) => {
      const { id, color, label, ...properties } = node;

      return Object.entries(properties).length <= 1;
    });

    return nodes?.map((node) => {
      const { id, color, label, ...properties } = node;
      return {
        id,
        key: id,
        value: id,
        label: (
          <NodePropertyItem>
            <StyledBadge color={color} text={label} />
            <span className="node-name">{getHighlightedText(properties.name, search ?? '')}</span>
          </NodePropertyItem>
        ),
      };
    });
  }, [data.nodeProperties, search]);

  const filterOption: FilterOption = (inputValue, option) => {
    return option!.key?.toUpperCase().indexOf(option?.key.toUpperCase() ?? '') !== -1;
  };

  return (
    <AntAutoComplete
      popupClassName="search-visualisation"
      dropdownMatchSelectWidth={400}
      style={{ width: 400 }}
      dropdownStyle={{
        left: 'calc(50% - 236px)',
        backdropFilter: 'blur(7px)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)',
      }}
      filterOption={filterOption}
      onSelect={onSelect}
      options={options}
      value={search}
    >
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search" />
    </AntAutoComplete>
  );
};
