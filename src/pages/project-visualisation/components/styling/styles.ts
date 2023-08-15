import styled from 'styled-components';
import { Collapse } from 'antd';

export const StyledCollape = styled(Collapse)`
  &&&& {
    .ant-collapse {
      background: #fff;
      border: none;
    }
    .ant-collapse-header {
      background: #ffffffe5;
      //box-shadow: -1px 4px 4px 0 rgba(128, 128, 128, 0.1);
      border: none !important;
    }
  }
`;

export const StyledMainWrapper = styled.div`
  padding: 12px 0;
  display: flex;
  flex-direction: column;
`;

export const StyledContainsWrapper = styled.div`
  margin: 24px 0;
`;
