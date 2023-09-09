import React from 'react';
import { AutoComplete as AntAutoComplete, Badge } from 'antd';
import styled from 'styled-components';
import { Input } from 'components/input';
import { FilterFunc } from 'rc-select/lib/Select';
// import { useGetSearchData } from '../../../../api/visualisation/use-get-search';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';

type FilterOption = boolean | FilterFunc<{ value: string; label: JSX.Element }> | undefined;

type Props = React.FC<{ search: string | undefined; setSearch: (value: string) => void }>;

const StyledBadge = styled(Badge)`
  && {
    .ant-badge-status-dot {
      height: 8px;
      width: 8px;
    }
  }
`;

const renderTypes = (id: string, title: string, color: string) => ({
  id: id,
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
  const { graph } = useGraph();

  // const { nodes: options } = useGetSearchData({ enabled: search ? search.length > 3 : false }, search ?? '');

  const onSelect = (value: string, item: { id: string }) => {
    const node = graph.getNodes().find((a) => a.getID() === item.id);

    const nodeX = node?.getModel().x ?? 0;
    const nodeY = node?.getModel().y ?? 0;

    // Calculate the ne view center based on the clicked node
    const centerX = graph.getCanvasByPoint(nodeX, nodeY).x;
    const centerY = graph.getCanvasByPoint(nodeX, nodeY).y;

    const zoomLevel = 2; // You can adjust this value as needed

    graph.zoomTo(
      zoomLevel,
      {
        x: centerX,
        y: centerY,
      },
      true
    );

    setTimeout(() => {
      graph.clear();

      graph.addItem('node', { ...node?.getModel() });

      graph.fitCenter(true, {
        duration: 400,
        easing: 'easePolyIn',
      });
    }, 500);
  };

  const filterOption: FilterOption = (inputValue, option) =>
    option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;

  // const opt = options?.map((n) =>
  //   renderTypes(
  //     n._fields[0].properties.id as string,
  //     n._fields[0].properties.name as string,
  //     n._fields[0].properties.color as string
  //   )
  // );

  return (
    <AntAutoComplete
      popupClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={400}
      dropdownStyle={{
        left: 490,
        top: 228,
        backdropFilter: 'blur(7px)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)',
      }}
      style={{ width: 400 }}
      onSelect={onSelect}
      filterOption={filterOption}
      options={[
        ...graph
          .getNodes()
          .map((n) => renderTypes(n.getID(), n.getModel().label as string, n.getModel().style?.stroke as string)),
      ]}
    >
      <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search" />
    </AntAutoComplete>
  );
};
