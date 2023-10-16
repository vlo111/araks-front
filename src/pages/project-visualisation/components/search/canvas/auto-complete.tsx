import React, { useMemo } from 'react';
import { AutoComplete as AntAutoComplete } from 'antd';
import { Input } from 'components/input';
import { FilterFunc } from 'rc-select/lib/Select';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { useGetSearchData } from 'api/visualisation/use-get-search';
import { renderNodeProperties } from './options/node-property';
import { renderTypes } from './options/node-type';
import { renderEdgeTypes } from './options/edge-type';
import { renderEdgeProperties } from './options/edge-property';
import { useGetSelectedSearchData } from 'api/visualisation/use-get-selected-search';
import { initData } from 'components/layouts/components/visualisation/container/initial/nodes';
import { formattedData } from 'components/layouts/components/visualisation/helpers/format-node';
import { useGetData } from 'api/visualisation/use-get-data';

type FilterOption = boolean | FilterFunc<{ key: string; value: string; label: JSX.Element }> | undefined;

type Props = React.FC<{
  search: string | undefined;
  setSearch: (value: string) => void;
  setIsEnterSearch: React.Dispatch<React.SetStateAction<string>>;
  isEnterSearch: string;
  collapsed?: boolean;
}>;

export const AutoComplete: Props = ({ search, setSearch, isEnterSearch, setIsEnterSearch, collapsed }) => {
  const { graph, setGraphInfo } = useGraph();

  useGetData(
    {
      enabled: !!isEnterSearch,
      onSuccess: ({ data }) => {
        graph.clear();
        initData(graph, formattedData(data.nodes, data.edges, data.relationsCounts));
        graph.render && graph.render();

        setGraphInfo({
          nodeCount: graph.getNodes().length,
        });
        setIsEnterSearch('');
      },
    },
    isEnterSearch
  );

  const { data } = useGetSearchData({ enabled: search ? search.trim()?.length > 2 : false }, search?.trim() ?? '');

  const { mutate } = useGetSelectedSearchData({
    onSuccess: (data) => {
      const {
        data: { nodes, edges, relationsCounts },
      } = data ?? {};

      initData(graph, formattedData(nodes, edges, relationsCounts));
      graph.render && graph.render();

      setGraphInfo({
        nodeCount: graph.getNodes().length,
      });
    },
  });

  const onSelect = (value: string, item: { id: string; mode: string; value: string }) => {
    mutate({ id: item.id, action: item.mode });
  };
  const nodeTypes = useMemo(
    () => data.nodeTypes?.map(({ id, label, color }) => renderTypes(id, label, color, search ?? '')),
    [data.nodeTypes, search]
  );

  const edgeTypes = useMemo(
    () => data.edgeTypes?.map((edge) => renderEdgeTypes(edge, search ?? '')),
    [data.edgeTypes, search]
  );

  const nodeProperties = useMemo(
    () => data.nodeProperties?.map((node) => renderNodeProperties(search ?? '', node)),
    [data.nodeProperties, search]
  );

  const edgeProperties = useMemo(
    () => data.edgeProperties?.map((edge) => renderEdgeProperties(edge, search ?? '')),
    [data.edgeProperties, search]
  );

  const options = edgeProperties?.concat(edgeTypes).concat(nodeProperties).concat(nodeTypes);

  const filterOption: FilterOption = (inputValue, option) => {
    return option!.key?.toUpperCase().indexOf(option?.key.toUpperCase() ?? '') !== -1;
  };

  return (
    <AntAutoComplete
      popupClassName="search-visualisation"
      dropdownMatchSelectWidth={400}
      style={{ width: 400 }}
      dropdownStyle={{
        left: collapsed ? 490 : 30,
        top: 228,
        backdropFilter: 'blur(7px)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)',
      }}
      onSelect={onSelect}
      filterOption={filterOption}
      options={options?.map((o, i) => ({ key: `${o.id}${i}`, ...o }))}
      value={search}
    >
      <Input
        onPressEnter={({ target }) => {
          setIsEnterSearch((target as HTMLInputElement).value);
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search"
      />
    </AntAutoComplete>
  );
};
