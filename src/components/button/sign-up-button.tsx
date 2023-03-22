import { Button as Component, ButtonProps } from 'antd';
import styled from 'styled-components';

import { COLORS } from '../../helpers/constants';
import { ReactComponent as AzureSignUp } from '../icons/azure-sign-up.svg';

type ReturnTypeData = {
  icon: JSX.Element;
  children: string;
};

const getTypeData = (type: string): ReturnTypeData | undefined => {
  switch (type) {
    case 'azure':
      return {
        icon: <AzureSignUp />,
        children: 'Sign Up With Microsoft Azure',
      };
  }
  return;
};

type Props = ButtonProps & {
  iconType: 'azure';
};

export const SignUpButton = styled(({ iconType, ...props }: Props) => (
  <Component {...props} {...getTypeData(iconType)} />
))`
  &.ant-btn-default {
    background: #f5f5f5;
    border-color: ${COLORS.PRIMARY.WHITE};

    span {
      color: ${COLORS.PRIMARY.GRAY_DARK};
      margin-left: 16px;
    }

    &:hover {
      background: #ededed;
      border-color: ${COLORS.PRIMARY.WHITE};
    }

    &:active {
      background: #f5f5f5;
      border-color: ${COLORS.PRIMARY.WHITE};
    }

    &:disabled {
      background: #f5f5f5;
      opacity: 0.6;
    }
  }
`;
