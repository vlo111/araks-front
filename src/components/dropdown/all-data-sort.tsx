import { Dropdown, Button, Space, MenuProps, DropdownProps } from 'antd';
import styled from 'styled-components';

import { ReactComponent as Polygon } from '../icons/polygon.svg';
import { Text } from '../typography';
import { COLORS } from '../../helpers/constants';

import './sort.css';
import { useState } from 'react';

const DropdownButton = styled(Button)`
  width: 100%;
  padding: 7px 16px;
  border: 1px solid #dee1e8;
  background-color: #ededf3;
`;

export type SortItems = {
  label: string;
  key: string;
};

const setItems = (sortItems: SortItems[]): MenuProps['items'] =>
  sortItems.map((item) => ({
    label: <Text style={{ color: COLORS.PRIMARY.GRAY }}>{item.label}</Text>,
    key: `${item.label}-${item.key}`,
  }));

type Props = DropdownProps & {
  sortItems: SortItems[];
  infoText?: string;
};

export const AllDataSort = ({ sortItems, infoText, ...props }: Props) => {
  const [text, setText] = useState(sortItems[0].label);

  const handleMenuClick: MenuProps['onClick'] = ({ key, keyPath, domEvent }) => {
    setText(key);
  };

  return (
    <Dropdown
      menu={{ items: setItems(sortItems), onClick: handleMenuClick }}
      trigger={['click']}
      {...props}
      overlayClassName="sort-dropdown"
    >
      <DropdownButton>
        <Space align="center" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            {infoText}
            <Text style={{ color: COLORS.PRIMARY.GRAY, marginLeft: '16px' }}>{text}</Text>
          </Space>
          <Polygon />
        </Space>
      </DropdownButton>
    </Dropdown>
  );
};
