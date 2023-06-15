import { CaretDownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import styled from 'styled-components';
import './share-select.css';

const SelectComponent = styled(Select)`
  &.ant-select-disabled {
    .ant-select-selector {
      background: #ededf3 !important;
      border: 1px solid #dee1e8;
    }

    .ant-select-selection-item {
      font-size: 20px;
      line-height: 26px;
      text-align: right;
      color: rgb(128, 128, 128) !important;
    }
  }

  && {
    .ant-select-selection-item {
      font-weight: 600;
      letter-spacing: 0.07em;
      color: #232f6a;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 1;
    }
  }

  .ant-select-arrow {
    transition: transform 0.2s ease-in;
  }

  &.ant-select-open {
    .ant-select-arrow {
      transform: rotate(180deg);
    }
  }
`;

export const SelectItems = ({ ...props }): JSX.Element => (
  <SelectComponent suffixIcon={<CaretDownOutlined />} {...props} />
);
