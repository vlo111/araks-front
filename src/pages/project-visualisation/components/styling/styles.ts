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
      border: none ;
    }
  }
`;

export const StyledMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px 0;
`;

export const StyledContainsWrapper = styled.div`
  margin: 24px 0;
`;
