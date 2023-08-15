import { TabsProps, Col, Row as RowComponent } from 'antd';
import { Styling } from '../styling';
import styled from 'styled-components';
import { StyledDataVisualisationSiderTabs } from './styles';
export const Items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Filters',
  },
  {
    key: '2',
    label: 'Queries',
  },
  {
    key: '3',
    label: 'Styling',
  },
];


const Row = styled((props) => <RowComponent {...props} />)`
    &.overview {
      height: calc(100vh - 152px);
      width: 100%;
      .ant-col.overview__section {
        &:first-child {
          background: #f2f2f2;
          box-shadow: 10px 0 10px rgba(111, 111, 111, 0.1);
        }
      }

      .overview-form-items {
        min-height: 80vh;
      }
    }
  `;


export const LeftSection = () => {
  return (
    <Row >
      <Row className="overview">
        <Col className="overview__section project-save" id="datasheet-tree-list" style={{ zIndex: 3, width: "480px"}}>
          <StyledDataVisualisationSiderTabs
            destroyInactiveTabPane
            defaultActiveKey="1"
            items={Items.map((item) => ({
              ...item,
              children:
                item.key === '1' ? (
                  <h1>Filters</h1>
                ) : item.key === '2' ? (
                  <h1>Queries</h1>
                ) : (
                  <Styling />
                ),
            }))}
          />
        </Col>
      </Row>
    </Row>
  );
};
