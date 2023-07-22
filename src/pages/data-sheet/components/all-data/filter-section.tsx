import { Col, Row } from 'antd';
import { DownloadAction } from 'components/actions';
import { QueriesButton } from 'components/button/queries-button';
import { Sort } from 'components/dropdown';
import { ALL_DATA_SORT_BY } from 'components/dropdown/constants';
import { ExpandableInput, SearchText } from 'components/input/expandable-input';
import { DeleteAllDataModal } from 'components/modal/delete-all-data-modal';
import { useCallback } from 'react';
import { defaultAllDataFilter } from '../right-section-all-data';

type Props = {
  checkedItems: string[];
  setCheckedItems: (checkedItems: string[]) => void;
  setFilterValue: (
    filter: typeof defaultAllDataFilter | ((prevVar: typeof defaultAllDataFilter) => typeof defaultAllDataFilter)
  ) => void;
};

export const AllDataFilterSection = ({ setFilterValue, checkedItems, setCheckedItems }: Props) => {
  const setSearchText = useCallback(
    ({ text, type }: SearchText) => {
      setFilterValue((prevValue) => ({ ...prevValue, search: text, type }));
    },
    [setFilterValue]
  );

  return (
    <Row justify="space-between" style={{ padding: '24px 32px 32px 24px' }} gutter={[8, 8]}>
      <Col span={16}>
        <Row gutter={24}>
          <Col xxl={8}>
            <Sort prefix="Sort By:" sortItems={ALL_DATA_SORT_BY} fullWidth />
          </Col>
          <Col xxl={8}>
            <ExpandableInput setSearchText={setSearchText} />
          </Col>
        </Row>
      </Col>
      <Col span={8}>
        <Row gutter={24} justify="end">
          <Col>
            <DeleteAllDataModal checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
          </Col>
          <Col>
            <DownloadAction />
          </Col>
          <Col>
            <QueriesButton />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
