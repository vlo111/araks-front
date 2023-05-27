import React from 'react';
import { AutoComplete as AntAutoComplete, Badge } from 'antd';
import styled from 'styled-components';
import { Input } from 'components/input';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { selectNodeWithZoom } from 'components/layouts/components/schema/helpers/selection';
import { FilterFunc } from 'rc-select/lib/Select';

type FilterOption = boolean | FilterFunc<{ value: string; label: JSX.Element }> | undefined;

type Props = React.FC<{ search: string | undefined; setSearch: (value: string) => void }>;

const StyledBadge = styled(Badge)`
  && {
    .ant-badge-status-dot {
      height: 16px;
      width: 16px;
    }
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

export const AutoComplete: Props = ({ search, setSearch }) => {
  const { graph, selected, setSelected, nodes } = useSchema() || {};

  const onSelect = (name: string) => {
    selectNodeWithZoom(nodes.find((n) => n.name === name)?.id ?? '', graph, selected, setSelected);
  };

  const filterOption: FilterOption = (inputValue, option) =>
    option!.value === '#types_key#' ? true : option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;

  return (
    <AntAutoComplete
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
      filterOption={filterOption}
      options={[
        {
          label: <span style={{ fontWeight: 800, fontSize: 18, color: '#000000b5' }}>Types</span>,
          value: '#types_key#',
        },
        ...nodes.map((n) => renderTypes(n.name, n.color)),
      ]}
    >
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search" />
    </AntAutoComplete>
  );
};
