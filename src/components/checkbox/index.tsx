import { Checkbox as CheckboxComponent } from 'antd';
import styled from 'styled-components';

export const Checkbox = styled(CheckboxComponent)`
  &.all-data-checkbox {
    .ant-checkbox-input,
    .ant-checkbox-inner {
      width: 24px;
      height: 24px;

      &:after {
        width: 8px;
        height: 13px;
        top: 45%;
      }
    }
  }
`;
