import styled from 'styled-components';
import { Radio } from 'antd';

export const StyledMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px 0;
`;

export const StyledRadioButton = styled(Radio.Group)`
  .ant-radio-button-wrapper {
    border: none;

    &.ant-radio-button-wrapper-checked {
      border-radius: 4px;
      background: #232f6a;
      padding: 4px 16px 4px 8px;
    }
  }

  .ant-radio-button-wrapper:nth-child(2)::before {
    content: none;
  }
`;
