import styled from 'styled-components';
import { Row } from 'antd';

export const Wrapper = styled(Row)`
  height: 100%;
  width: 100%;

  .ant-spin-nested-loading {
    width: 100%;
  }

  .ant-spin {
    max-height: unset !important;

    &-container {
      height: 100%;
      width: 100%;
      display: flex;
      transition: all 1s;
    }
  }
`;
