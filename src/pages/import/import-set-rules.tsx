import { Col, Row } from 'antd';
import { ImportSetRulesDrawer } from 'components/drawer/import-set-rules-drawer';
import { VerticalSpace } from 'components/space/vertical-space';
import { MergeTable } from 'components/table/merge-table';
import { Title } from 'components/typography';

export const ImportSetRules = () => {
  return (
    <>
      <Row justify="space-between">
        <Col span={11}>
          <VerticalSpace>
            <Title level={3} style={{ marginTop: '40px' }}>
              Merging columns
            </Title>
            <MergeTable />
          </VerticalSpace>
        </Col>
      </Row>
      <ImportSetRulesDrawer />
    </>
  );
};
