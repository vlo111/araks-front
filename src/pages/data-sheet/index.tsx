import { Col, Row as RowComponent } from 'antd';
import styled from 'styled-components';
import { LeftSection } from './components/left-section';
import { RightSection } from './components/right-section';
import { TypePropertyProvider } from './components/table-section/table-context';

const Row = styled((props) => <RowComponent {...props} />)`
  &.overview {
    height: calc(100vh - 152px);

    .ant-col.overview__section {
      &:first-child {
        /* opacity: 1; */
        background: #f2f2f2;
        box-shadow: 10px 0px 10px rgba(111, 111, 111, 0.1);
      }
    }

    .overview-form-items {
      min-height: 80vh;
    }
  }
`;

export const DataSheet = () => {
  return (
    <TypePropertyProvider>
      <Row className="overview" gutter={1}>
        {/* zIndex greated than table on right side and lower than header has */}
        <Col xs={6} xxl={6} className="overview__section project-save" id="datasheet-tree-list" style={{ zIndex: 3 }}>
          <LeftSection />
        </Col>
        <Col xs={18} xxl={18} className="overview__section project-share" id="datasheet-data">
          <RightSection />
        </Col>
      </Row>
    </TypePropertyProvider>
  );
};
