import { ALL_DATA_SORT_BY } from 'components/dropdown/constants';
import { VerticalSpace } from 'components/space/vertical-space';
import { ViewDatasheetProvider } from 'context/datasheet-view-vontext';
import { SortProvider } from 'context/sort-context';
import { useState } from 'react';
import { AllDataFilterSection } from './all-data/filter-section';
import { AllDataList } from './all-data/list';

const defaultSort = ALL_DATA_SORT_BY[2].key.split(' ');

export const defaultAllDataFilter = {
  search: '',
  sortOrder: defaultSort[1],
  sortField: defaultSort[0],
};

export const RightSectionAllData = () => {
  const [filterValue, setFilterValue] = useState(defaultAllDataFilter); // state to store the input value
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  return (
    <SortProvider defaultValue={ALL_DATA_SORT_BY[2].key}>
      <VerticalSpace>
        <AllDataFilterSection
          setFilterValue={setFilterValue}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
        <ViewDatasheetProvider>
          <AllDataList filterValue={filterValue} checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
        </ViewDatasheetProvider>
      </VerticalSpace>
    </SortProvider>
  );
};
