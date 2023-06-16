import { Col, Row } from 'antd';
import { DownloadAction } from 'components/actions';
import { QueriesButton } from 'components/button/queries-button';
import { AllDataSort, PROJECT_SORT } from 'components/dropdown';
import { ExpandableInput } from 'components/input/expandable-input';
import { VerticalSpace } from 'components/space/vertical-space';
import { AllDataList } from './all-data/list';

export const RightSectionAllData = () => {
  return (
    <VerticalSpace>
      <Row justify="space-between">
        <Col span={20}>
          <Row gutter={24}>
            <Col span={8}>
              <AllDataSort sortItems={PROJECT_SORT} infoText="Sort by:" />
            </Col>
            <Col span={8}>
              <AllDataSort sortItems={PROJECT_SORT} infoText="Sort direction::" />
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
      <AllDataList />
    </VerticalSpace>
  );
};
