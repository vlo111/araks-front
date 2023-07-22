import { AllDataPageParameters } from 'api/types';
import { ALL_DATA_SORT_BY } from 'components/dropdown/constants';
import { VerticalSpace } from 'components/space/vertical-space';
import { ViewDatasheetProvider } from 'context/datasheet-view-vontext';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'helpers/constants';
import { useState } from 'react';
import { AllDataFilterSection } from './all-data/filter-section';
import { AllDataList } from './all-data/list';

const defaultSort = ALL_DATA_SORT_BY[2].key.split(' ');
const initPageData: AllDataPageParameters = { page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE };

export const defaultAllDataFilter: AllDataPageParameters = {
  search: '',
  sortOrder: defaultSort[1],
  sortField: defaultSort[0],
  type: 'node',
  ...initPageData,
};

export const RightSectionAllData = () => {
  const [filterValue, setFilterValue] = useState(defaultAllDataFilter); // state to store the input value
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  return (
    <VerticalSpace>
      <AllDataFilterSection
        setFilterValue={setFilterValue}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
      />
      <ViewDatasheetProvider>
        <AllDataList
          setFilterValue={setFilterValue}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          filterValue={filterValue}
        />
      </ViewDatasheetProvider>
    </VerticalSpace>
  );
};
