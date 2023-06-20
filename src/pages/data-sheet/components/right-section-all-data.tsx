import { ALL_DATA_SORT_BY } from 'components/dropdown/constants';
import { VerticalSpace } from 'components/space/vertical-space';
import { useState } from 'react';
import { AllDataFilterSection } from './all-data/filter-section';
import { AllDataList } from './all-data/list';

export const defaultAllDataFilter = {
  search: '',
  sortOrder: 'asc',
  sortField: ALL_DATA_SORT_BY[0].key,
};

export const RightSectionAllData = () => {
  const [filterValue, setFilterValue] = useState(defaultAllDataFilter); // state to store the input value

  return (
    <VerticalSpace>
      <AllDataFilterSection setFilterValue={setFilterValue} />
      <AllDataList filterValue={filterValue} />
    </VerticalSpace>
  );
};
