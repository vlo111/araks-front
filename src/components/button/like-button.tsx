import { Button as Component } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { COLORS } from '../../helpers/constants';

export const LikeButton = styled((props) => (
  <Component type="primary" icon={<HeartOutlined />} {...props}>
    LIKE PROJECT
  </Component>
))`
  &.ant-btn-primary {
    :active {
      background: #e0e2e8;
      border: 1px solid ${COLORS.PRIMARY.BLUE};

      span {
        color: #001479;
      }
    }
  }
`;
