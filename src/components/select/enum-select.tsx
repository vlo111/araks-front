import { CaretDownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import styled from 'styled-components';
import { useIsXXlScreen } from 'hooks/use-breakpoint';

const SelectComponent = styled(Select)<{ isXXl?: boolean }>`
  .ant-select-selector {
    height: ${(props) => (props.isXXl ? '40px' : '30px')} !important;
    padding-top: ${(props) => (props.isXXl ? '5px' : '0')} !important;
    border-radius: 4px;
    border: 1px solid #808080;
    background: linear-gradient(92deg, rgba(255, 255, 255, 0.64) 6.81%, rgba(255, 255, 255, 0.16) 100%);
  }

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

  .ant-select-selector && {
    .ant-select-selection-item {
      font-weight: 600;
      letter-spacing: 0.07em;
      color: #232f6a;
      display: flex;
      justify-content: flex-start;
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

export const SelectEnumItems = ({ ...props }): JSX.Element => {
  const isXXl = useIsXXlScreen();
  return (
    <SelectComponent
      allowClear
      placeholder="Select Variant"
      isXXl={isXXl}
      suffixIcon={<CaretDownOutlined />}
      {...props}
    />
  );
};
