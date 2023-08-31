import debounce from 'lodash.debounce';
import { EventDataNode } from 'antd/es/tree';
import { PropsSetState, TableStyleBasedOnTab, TreeNodeType } from '../types';
import { useCallback, useEffect, useState } from 'react';
import { SearchAction } from 'components/actions';
import { filterTreeData } from '../utils';
import { NodeTree } from 'components/tree/node-tree';
import { ReactComponent as CaretDown } from 'components/icons/caret-down.svg';
import { ReactComponent as CaretRight } from 'components/icons/caret-right.svg';

const switcherIcon = ({ isLeaf, expanded }: { isLeaf: boolean; expanded: boolean }) => {
  if (isLeaf) {
    return null;
  }
  return expanded ? <CaretDown /> : <CaretRight />;
};

type Props = PropsSetState &
  TableStyleBasedOnTab & {
    onSelect?: (selectedKeys: string[], e: { selected: boolean; node: EventDataNode<TreeNodeType> }) => void;
    onCheck: (checkedKeys: string[]) => void;
    nodesList: TreeNodeType[];
    color?: string;
    nodeTypeId?: string;
  };

export const NodeTypesView = ({
  onSelect,
  onCheck,
  nodesList,
  searchVisible,
  setSearchVisible,
  isCheckable = false,
  color,
  nodeTypeId,
}: Props) => {
  const [filteredData, setFilteredData] = useState<TreeNodeType[]>([]);

  useEffect(() => {
    if (nodesList && nodesList.length) {
      setFilteredData(nodesList);
    } else {
      setFilteredData([]);
    }
  }, [nodesList]);

  const onSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value.trim().toLowerCase();

      debounce(() => {
        const filteredData = filterTreeData(nodesList, searchText);
        setFilteredData(filteredData);
      }, 500)();
    },
    [nodesList]
  );

  const onClear = useCallback(() => {
    setFilteredData(nodesList);
  }, [nodesList]);

  return (
    <>
      {searchVisible && (
        <SearchAction
          isSearchActive={searchVisible}
          onClear={onClear}
          onChange={onSearch}
          setSearchActive={setSearchVisible}
        />
      )}
      <NodeTree
        onSelect={onSelect}
        showSearch
        checkable={isCheckable}
        onCheck={onCheck}
        switcherIcon={switcherIcon}
        selectedKeys={[nodeTypeId]}
        defaultExpandedKeys={[nodeTypeId]}
        treeData={filteredData}
        autoExpandParent
        blockNode
        defaultExpandAll
        color={color}
      />
    </>
  );
};
