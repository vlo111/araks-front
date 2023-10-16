import { TabsProps, Row as RowComponent, Col } from 'antd';
import styled from 'styled-components';
import { useIsXXlScreen } from 'hooks/use-breakpoint';
import { Filters } from '../filters';
import { Styling } from '../styling';
import { StyledDataVisualisationSiderTabs } from './styles';
import { Queries } from '../queries';
import { ReactComponent as CollapseSvg } from './icon/collapse.svg';
import { Dispatch, FC, SetStateAction } from 'react';

type Props = FC<{ collapsed?: boolean; setCollapsed?: Dispatch<SetStateAction<boolean>> }>;
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
  top: 0;
  left: 0;
  height: calc(100vh - 152px);
  overflow-y: auto;
  transition: width 0.5s ease-in-out;
  overflow-x: hidden;
`;

const CollapseCol = styled(Col)`
  position: absolute;
  width: 40px;
  height: 40px;
  cursor: pointer;
  top: 49%;
  z-index: 3;
  transition: left 0.5s ease-in-out;

  svg {
    transition: 0.5s ease-in-out;
  }
`;

export const LeftSection: Props = ({ collapsed, setCollapsed }) => {
  const isXXL = useIsXXlScreen();

  const sectionStyle = {
    transition: `opacity ${collapsed ? '2s' : '0.5s'} ease-in-out`,
    opacity: collapsed ? '1' : '0',
    overflow: collapsed ? 'auto' : 'hidden',
  };

  return (
    <Row>
      <Row className="overview">
        <StyledCol
          style={{ width: collapsed ? '480px' : '20px' }}
          className="overview__section project-save"
          id="datasheet-tree-list"
        >
          <StyledDataVisualisationSiderTabs
            style={sectionStyle}
            tabBarGutter={isXXL ? 50 : 30}
            destroyInactiveTabPane
            defaultActiveKey="1"
            items={Items.map((item) => ({
              ...item,
              children: item.key === '1' ? <Filters /> : item.key === '2' ? <Queries /> : <Styling />,
            }))}
          />
        </StyledCol>
        <CollapseCol
          style={{ left: collapsed ? '460px' : '0' }}
          onClick={() => {
            setCollapsed!(!collapsed);
          }}
        >
          <CollapseSvg style={{ transform: collapsed ? 'rotate(180deg)' : 'rotate(0)' }} />
        </CollapseCol>
      </Row>
    </Row>
  );
};
