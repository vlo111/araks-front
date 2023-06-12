import { Select } from 'antd';
import styled from 'styled-components';
import { CaretDownFilled } from '@ant-design/icons';

import './role.css';

import { ROLE_OPTIONS } from './constants';

const RoleSelect = styled(Select)`
  width: 150px;
  && {
    .ant-select-selection-item {
      font-weight: 600;
      letter-spacing: 0.07em;
      color: #232f6a;
    }
  }
`;

export const Role = () => {
  return (
    <RoleSelect
      defaultValue={ROLE_OPTIONS[0].value}
      popupClassName="role-dropdown"
      options={ROLE_OPTIONS}
      suffixIcon={<CaretDownFilled />}
      style={{ width: 150 }}
    />
  );
};
