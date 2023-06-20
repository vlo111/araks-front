import { Col, Row } from 'antd';
import { DownloadAction } from 'components/actions';
import { QueriesButton } from 'components/button/queries-button';
import { AllDataSort } from 'components/dropdown';
import { ALL_DATA_SORT_BY, SORT_DIRECTION } from 'components/dropdown/constants';
import { ExpandableInput } from 'components/input/expandable-input';
import { useCallback } from 'react';
import { defaultAllDataFilter } from '../right-section-all-data';

type Props = {
  setFilterValue: (
    filter: typeof defaultAllDataFilter | ((prevVar: typeof defaultAllDataFilter) => typeof defaultAllDataFilter)
  ) => void;
};
export const AllDataFilterSection = ({ setFilterValue }: Props) => {
  const setSearchText = useCallback(
    (text: string) => {
      setFilterValue((prevValue) => ({ ...prevValue, search: text }));
    },
    [setFilterValue]
  );

  const handleSortBySelect = useCallback(
    (key: string) => {
      setFilterValue((prevValue) => ({ ...prevValue, sortField: key }));
    },
    [setFilterValue]
  );

  const handleSortByDirection = useCallback(
    (key: string) => {
      setFilterValue((prevValue) => ({ ...prevValue, sortOrder: key }));
    },
    [setFilterValue]
  );

  return (
    <Row justify="space-between" style={{ padding: '24px 32px 32px 24px' }} gutter={[8, 8]}>
      <Col xxl={20} xs={24}>
        <Row gutter={24}>
          <Col xxl={8}>
            <AllDataSort sortItems={ALL_DATA_SORT_BY} infoText="Sort by:" handleMenuSelect={handleSortBySelect} />
          </Col>
          <Col xxl={8}>
            <AllDataSort
              sortItems={SORT_DIRECTION}
              infoText="Sort direction:"
              handleMenuSelect={handleSortByDirection}
            />
          </Col>
          <Col xxl={8}>
            <ExpandableInput setSearchText={setSearchText} />
          </Col>
        </Row>
      </Col>
      <Col xxl={4} xs={24}>
        <Row gutter={24}>
          <Col span={12}>
            <DownloadAction />
          </Col>
          <Col span={12}>
            <QueriesButton />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
