import { Button as Component, ButtonProps } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { COLORS, screenSize } from 'helpers/constants';

type Props = ButtonProps & {
  text?: 'LIKE' | 'UNLIKE';
};

export const LikeButton = styled(({ text = 'LIKE', ...props }: Props) => (
  <Component
    type={text === 'LIKE' ? 'primary' : 'default'}
    icon={text === 'LIKE' ? <HeartOutlined /> : <HeartFilled />}
    {...props}
  >
    {text} PROJECT
  </Component>
))`
  &.ant-btn-primary {
    font-size: 20px;
    line-height: 1.4;
    font-weight: 700;

    :active {
      background: #e0e2e8;
      border: 1px solid ${COLORS.PRIMARY.BLUE};

      span {
        color: #001479;
      }
    }
  }
  &.ant-btn-default {
    background: #e0e2e8;
    color: #001479;
    border: 1px solid ${COLORS.PRIMARY.BLUE};
    font-size: 20px;
    line-height: 1.4;
    font-weight: 700;

    @media (max-width: ${screenSize.xxl}) {
      font-size: 16px;
      line-height: 1.1;
    }
    :hover {
      background: #e0e2e8;
      border: 1px solid ${COLORS.PRIMARY.BLUE};

      span {
        color: #001479;
      }
    }
  }
`;
