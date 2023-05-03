import { COLORS } from 'helpers/constants';
import { Menu as MenuComponent } from 'antd';
import styled from 'styled-components';

export const PropertyMenu = styled(MenuComponent)`
  background-color: transparent;

  &&.ant-menu-vertical {
    border-inline-end: none;
  }

  .ant-menu-title-content .ant-typography {
    color: ${COLORS.PRIMARY.BLUE};
  }

  .ant-menu-submenu .ant-menu-submenu-title,
  .ant-menu-item {
    margin: 4px 0;
    width: 100%;

    &:hover,
    &:active {
      background: linear-gradient(90deg, rgba(35, 47, 106, 0.2) 0%, rgba(35, 47, 106, 0.2) 100%);
      border: 1px solid #ffffff;
      transition: transform 0.15s;
    }

    &.ant-menu-item-disabled {
      .ant-menu-title-content .ant-typography {
        color: ${COLORS.PRIMARY.GRAY};
      }

      svg path {
        fill: ${COLORS.PRIMARY.GRAY};
      }
    }
  }
`;
