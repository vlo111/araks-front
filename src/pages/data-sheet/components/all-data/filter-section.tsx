import { Col, Row } from 'antd';
import { DownloadAction } from 'components/actions';
import { QueriesButton } from 'components/button/queries-button';
import { AllDataSort } from 'components/dropdown';
import { ALL_DATA_SORT_BY, SORT_DIRECTION } from 'components/dropdown/constants';
import { ExpandableInput } from 'components/input/expandable-input';

export const AllDataFilterSection = () => {
  return (
    <Row justify="space-between" style={{ padding: '24px 32px 32px 24px' }}>
      <Col span={20}>
        <Row gutter={24}>
          <Col span={8}>
            <AllDataSort sortItems={ALL_DATA_SORT_BY} infoText="Sort by:" />
          </Col>
          <Col span={8}>
            <AllDataSort sortItems={SORT_DIRECTION} infoText="Sort direction::" />
          </Col>
          <Col span={8}>
            <ExpandableInput />
          </Col>
        </Row>
      </Col>
      <Col span={4}>
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
