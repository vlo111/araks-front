import { Dropdown, Button, Space, MenuProps, message, DropdownProps } from "antd"
import styled from "styled-components"

import { ReactComponent as SortIcon } from '../icons/sort.svg';
import { ReactComponent as Polygon } from '../icons/polygon.svg';
import { Text } from "../typography";
import { COLORS } from "../../helpers/constants";
import { useSort } from "../../context/sort-context";

import './sort.css';
import { useState } from "react";

const DropdownButton = styled(Button)`
    width: 232px;
    padding: 7px 16px;
    border: 1px solid #DEE1E8;
    background-color: #EDEDF3;
`;

export type SortItems = {
  label: string,
  key: string
};

const setItems = (sortItems: SortItems[]): MenuProps['items'] => sortItems.map((item) => ({
  label: <Text style={{ color: COLORS.PRIMARY.GRAY }}>{item.label}</Text>,
  key: `${item.label}-${item.key}`,
}));

type Props = DropdownProps & {
  sortItems: SortItems[]
}

export const Sort = ({sortItems, ...props}: Props) => {
  const { dispatch } = useSort();
  const [text, setText] = useState('Custom');

  const handleMenuClick: MenuProps['onClick'] = ({ key, keyPath, domEvent }) => {
    console.log('click', key, keyPath, domEvent.target);
    const [label, order] = key.split('-');
    setText(label);
    dispatch(order);
  };

  return <Dropdown
    menu={{ items: setItems(sortItems), onClick: handleMenuClick }} 
    trigger={['click']}
    {...props} 
    overlayClassName='sort-dropdown'>
      <DropdownButton>
          <Space align="center" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Space>
                  <SortIcon />
                  <Text style={{ color: COLORS.PRIMARY.GRAY, marginLeft: '16px' }}>{ text }</Text>
              </Space>
              <Polygon />
          </Space>
      </DropdownButton>
  </Dropdown>;
}