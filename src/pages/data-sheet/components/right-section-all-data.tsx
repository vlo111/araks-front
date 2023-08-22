import { Col, Row } from 'antd';
import { AllDataPageParameters } from 'api/types';
import { QueriesButton } from 'components/button/queries-button';
import { ALL_DATA_SORT_BY } from 'components/dropdown/constants';
import { VerticalSpace } from 'components/space/vertical-space';
import { ViewDatasheetProvider } from 'context/datasheet-view-vontext';
import { useOverview } from 'context/overview-context';
import { initPageData } from 'helpers/constants';
import { useState } from 'react';
import { AllDataFilterSection } from './all-data/filter-section';
import { AllDataList } from './all-data/list';

const defaultSort = ALL_DATA_SORT_BY[2].key.split(' ');

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
  const { hideLeftSection } = useOverview();

  return (
    <Row gutter={32}>
      <Col span={hideLeftSection ? 18 : 24}>
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
      </Col>
      <Col span={hideLeftSection ? 6 : 0}>
        <QueriesButton />
      </Col>
    </Row>
  );
};
