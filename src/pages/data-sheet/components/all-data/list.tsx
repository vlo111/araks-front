import { useEffect } from 'react';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { defaultAllDataFilter } from '../right-section-all-data';
import { AllDataListNode } from './list-node';
import { AllDataListDocument } from './list-document';

type Props = {
  filterValue: typeof defaultAllDataFilter;
  checkedItems: string[];
  setCheckedItems: (values: string[]) => void;
  setFilterValue: (
    filter: typeof defaultAllDataFilter | ((prevVar: typeof defaultAllDataFilter) => typeof defaultAllDataFilter)
  ) => void;
};

export const AllDataList = ({ filterValue, setFilterValue, checkedItems, setCheckedItems }: Props) => {
  const { allDataTypesList } = useDataSheetWrapper();

  useEffect(() => {
    if (allDataTypesList) {
      setFilterValue((prev) => ({
        ...prev,
        project_type_list_id: allDataTypesList,
      }));
    }
  }, [allDataTypesList, setFilterValue]);

  return (
    <>
      {filterValue.type === 'node' && (
        <AllDataListNode
          setFilterValue={setFilterValue}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          filterValue={filterValue}
        />
      )}
      {filterValue.type === 'document' && (
        <AllDataListDocument
          setFilterValue={setFilterValue}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          filterValue={filterValue}
        />
      )}
    </>
  );
};
