import { Radio as RadioComponent, Space } from 'antd';
import { FormItem } from 'components/form/form-item';

import { ReactComponent as Users } from 'components/icons/users.svg';
import { ReactComponent as Globe } from 'components/icons/globe.svg';
import { Text } from 'components/typography';
import styled from 'styled-components';

const RadioGroup = styled(RadioComponent.Group)`
  &.ant-radio-group {
    display: flex;
    flex-direction: column;
    gap: 17px;
  }
`;
const RadioButton = styled(RadioComponent.Button)`
  &&.ant-radio-button-wrapper {
    height: 52px;
    box-shadow: 0px 4px 6px rgba(111, 111, 111, 0.1);
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 13px 18px;

    .ant-typography {
      color: #808080;
    }

    .icon path {
      fill: #808080;
    }

    &.ant-radio-button-wrapper-checked {
      border: 1px solid rgba(200, 203, 218, 0.5);
      background: #d5d7df;
      .ant-radio-button-checked {
      }

      .icon path {
        fill: #414141;
      }

      .ant-typography {
        color: #414141;
      }
    }

    &::before {
      background-color: transparent;
    }
  }
`;

export const ProjectType = () => {
  return (
    <FormItem name="privacy" initialValue="private">
      <RadioGroup buttonStyle="solid">
        <RadioButton value="public">
          <Space size={30}>
            <Globe className="icon" />
            <Text>Public</Text>
          </Space>
        </RadioButton>
        <RadioButton value="private">
          <Space size={30}>
            <Users className="icon" />
            <Text>Private</Text>
          </Space>
        </RadioButton>
      </RadioGroup>
    </FormItem>
  );
};
