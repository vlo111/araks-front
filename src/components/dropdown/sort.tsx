import { Dropdown, Button, Space, MenuProps, DropdownProps } from 'antd';
import styled, { css } from 'styled-components';

import { ReactComponent as SortIcon } from '../icons/sort.svg';
import { ReactComponent as Polygon } from '../icons/polygon.svg';
import { Text } from '../typography';
import { COLORS, screenSize } from '../../helpers/constants';
import { useSort } from '../../context/sort-context';

import './sort.css';
import { useState } from 'react';
import { changeHeight } from 'helpers/styles';

const DropdownButton = styled(({ fullWidth, ...props }) => <Button {...props} />)`
  ${(props) =>
    !props.size
      ? css`
          ${changeHeight}
        `
      : ''}
  ${(props) =>
    props.fullWidth
      ? css`
          width: 100%;
        `
      : css`
          width: 232px;
        `}

  padding: 7px 16px;
  border: 1px solid #dee1e8;
  background-color: #ededf3;

  .sort-icon {
    @media (max-width: ${screenSize.xxl}) {
      height: 12px;
      width: 12px;
    }
  }
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
  prefix?: string;
  fullWidth?: boolean;
};

export const Sort = ({ sortItems, prefix, fullWidth, ...props }: Props) => {
  const { dispatch, state } = useSort();
  const [text, setText] = useState(() => sortItems.find((item) => item.key === state)?.label || 'Custom');

  const handleMenuClick: MenuProps['onClick'] = ({ key, keyPath, domEvent }) => {
    const [label, order] = key.split('-');
    setText(label);
    dispatch(order);
  };

  return (
    <Dropdown
      menu={{ items: setItems(sortItems), onClick: handleMenuClick }}
      trigger={['click']}
      {...props}
      overlayClassName="sort-dropdown"
    >
      <DropdownButton fullWidth={fullWidth}>
        <Space align="center" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            {prefix || <SortIcon className="sort-icon" />}
            <Text style={{ color: COLORS.PRIMARY.GRAY, marginLeft: '16px' }}>{text}</Text>
          </Space>
          <Polygon />
        </Space>
      </DropdownButton>
    </Dropdown>
  );
};
