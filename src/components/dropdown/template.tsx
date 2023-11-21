import { Dropdown as Component, Button, Space } from 'antd';
import styled from 'styled-components';

import { ReactComponent as TemplateIcon } from '../icons/template.svg';
import { Text } from '../typography';
import { COLORS } from 'helpers/constants';

const DropdownButton = styled(Button)`
  width: 232px;
  padding: 7px 16px;
  border: 1px solid #dee1e8;
  background-color: #ededf3;
`;

const DropdownContent = () => (
  <DropdownButton>
    <Space align="center" style={{ display: 'flex', justifyContent: 'start' }}>
      <TemplateIcon />
      <Text style={{ color: COLORS.PRIMARY.GRAY, marginLeft: '16px' }}>Template</Text>
    </Space>
  </DropdownButton>
);

export const Template = styled((props) => (
  <Component {...props}>
    <DropdownContent />
  </Component>
))``;
