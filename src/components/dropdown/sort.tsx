import { Dropdown, Button, Space, MenuProps, message, DropdownProps } from "antd"
import styled from "styled-components"

import { ReactComponent as SortIcon } from '../icons/sort.svg';
import { ReactComponent as Polygon } from '../icons/polygon.svg';
import { Text } from "../typography";
import { COLORS } from "../../helpers/constants";

import './sort.css';

const DropdownButton = styled(Button)`
    width: 232px;
    padding: 7px 16px;
    border: 1px solid #DEE1E8;
    background-color: #EDEDF3;
`;

const items: MenuProps['items'] = [
    {
      label: <Text style={{ color: COLORS.PRIMARY.GRAY }}>A to Z</Text>,
      key: '1',
    },
    {
      label: <Text style={{ color: COLORS.PRIMARY.GRAY }}>Z to A</Text>,
      key: '2',
    },
    {
      label: <Text style={{ color: COLORS.PRIMARY.GRAY }}>Newest First</Text>,
      key: '3',
    },
    {
        label: <Text style={{ color: COLORS.PRIMARY.GRAY }}>Oldest First</Text>,
        key: '4',
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

// export const Sort = styled(({customOnClick, ...props}) => <Component {...props} trigger={['click']} children={<DropdownContent />} menu={menuProps} />)`
    
// `;

export const Sort = (props: DropdownProps) => <Dropdown menu={menuProps} trigger={['click']} {...props} overlayClassName='sort-dropdown' >
    <DropdownButton>
        <Space align="center" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Space>
                <SortIcon />
                <Text style={{ color: COLORS.PRIMARY.GRAY, marginLeft: '16px' }}>Custom</Text>
            </Space>
            <Polygon />
        </Space>
    </DropdownButton>
</Dropdown>