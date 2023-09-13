import { Form, Skeleton } from 'antd';
import debounce from 'lodash.debounce';
import { EventDataNode } from 'antd/es/tree';
import { PropsSetState, TableStyleBasedOnTab, TreeNodeType } from '../../types';
import { GET_PROJECT_NODE_TYPES_LIST, useGetProjectNoteTypes } from 'api/project-node-types/use-get-project-note-types';
import { useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { SearchAction } from 'components/actions';
import { filterTreeData } from '../../utils';
import { ReactComponent as CaretDown } from 'components/icons/caret-down.svg';
import { ReactComponent as CaretRight } from 'components/icons/caret-right.svg';
import { QueriesNodeTree } from 'components/tree/queries-node-tree';
import { createQueriesNodesTree } from 'components/layouts/components/data-sheet/utils';

const switcherIcon = ({ isLeaf, expanded }: { isLeaf: boolean; expanded: boolean }) => {
  if (isLeaf) {
    return null;
  }
  return expanded ? <CaretDown /> : <CaretRight />;
};

type Props = PropsSetState &
  TableStyleBasedOnTab & {
    setOpenTable: (openTable: boolean) => void;
    isVisualisation?: boolean;
    // add: () => void;
    // fieldsLength: number;
  };

function findChildrenProperties(arr: TreeNodeType[], selectedValue: string) {
  for (const element of arr) {
    if (element.children) {
      if (element.value === selectedValue) {
        return {
          ...element,
          depth: 1,
          labelName: element.label,
          labelValue: element.name,
        };
      }
      for (const child of element.children) {
        if (child.value === selectedValue) {
          return {
            ...child,
            depth: 2,
            labelName: `${element.name}.${child.label}`,
            labelValue: element.name,
            name: child.label,
            parent_id: element.id,
          };
        }
      }
    }
  }
  return null;
}

export const NodeTypesQueries = ({
  searchVisible,
  setSearchVisible,
  isCheckable = false,
  noColors = false,
  setOpenTable,
  isVisualisation,
}: // setOpenTable,
// add,
// fieldsLength,
Props) => {
  const form = Form.useFormInstance();
  const params = useParams();
  const [filteredData, setFilteredData] = useState<TreeNodeType[]>([]);
  const visualisationFilter = ['default_image', 'type', 'name'];

  const { formatted: nodesList, isInitialLoading } = useGetProjectNoteTypes(
    {
      url: GET_PROJECT_NODE_TYPES_LIST,
      projectId: params.id || '',
    },
    {
      enabled: !!params.id,
      onSuccess(data) {
        if (isVisualisation) {
          const visualisationFilteredData = data.data.map((item) => {
            return {
              ...item,
              properties: item.properties?.filter((property) => visualisationFilter.includes(property.name)),
            };
          });
          setFilteredData(createQueriesNodesTree(visualisationFilteredData));
        } else {
          setFilteredData(createQueriesNodesTree(data.data));
        }
      },
    },
    noColors
  );

  const onSelect = (selectedKeys: string[], e: { selected: boolean; node: EventDataNode<TreeNodeType> }) => {
    setOpenTable(false);

    form.setFieldValue('queries', [
      ...(form.getFieldValue('queries') || []),
      findChildrenProperties(filteredData, selectedKeys[0]),
    ]);
  };

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

  return isInitialLoading ? (
    <Skeleton />
  ) : (
    <>
      {searchVisible && (
        <SearchAction
          isSearchActive={searchVisible}
          onClear={onClear}
          onChange={onSearch}
          setSearchActive={setSearchVisible}
        />
      )}
      <QueriesNodeTree
        onSelect={onSelect}
        showSearch
        checkable={isCheckable}
        switcherIcon={switcherIcon}
        treeData={filteredData}
        autoExpandParent
        blockNode
        defaultExpandAll
      />
    </>
  );
};
