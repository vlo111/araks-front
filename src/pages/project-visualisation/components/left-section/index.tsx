import { TabsProps, Row as RowComponent, Col } from 'antd';
import { Styling } from '../styling';
import styled from 'styled-components';
import { StyledDataVisualisationSiderTabs } from './styles';
import { useIsXXlScreen } from 'hooks/use-breakpoint';
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
      height: 100%;
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

export const StyledCol = styled(Col)`
  position: absolute;
  left: 0;
  height: calc(100vh - 150px);
  overflow-y: auto;
  width: 480px;
  z-index: 99;
`

export const LeftSection = () => {
  const isXXL = useIsXXlScreen();

  return (
    <Row >
      <Row className="overview">
        <StyledCol className="overview__section project-save" id="datasheet-tree-list">
          <StyledDataVisualisationSiderTabs
            tabBarGutter={isXXL ? 50 : 30}
            destroyInactiveTabPane
            defaultActiveKey="3"
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
        </StyledCol>
      </Row>
    </Row>
  );
};
