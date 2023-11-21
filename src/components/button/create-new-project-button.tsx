import { Button as Component, ButtonProps } from 'antd';
import { VerticalSpace } from 'components/space/vertical-space';
import styled, { css } from 'styled-components';

import { COLORS } from 'helpers/constants';
import { ReactComponent as PlusDashed } from '../icons/plus-dashed.svg';
import { Text } from '../typography';

type Props = ButtonProps & {
  fullWidth?: boolean;
};

const ButtonContent = ({ fullWidth }: Omit<Props, 'ButtonProps'>) => (
  <VerticalSpace size={fullWidth ? 'middle' : 'small'} direction={fullWidth ? 'horizontal' : 'vertical'}>
    <PlusDashed style={{ width: fullWidth ? '30px' : '60px', height: fullWidth ? '30px' : '60px' }} />
    <Text className="button-content__text">
      Create New <br hidden={fullWidth} /> Project
    </Text>
  </VerticalSpace>
);

export const CreateNewProjectButton = styled(({ fullWidth, ...props }: Props) => (
  <Component {...props}>
    <ButtonContent fullWidth={fullWidth} />
  </Component>
))`
  &.ant-btn-default {
    background: transparent;
    ${(props: Props) =>
      props.fullWidth
        ? css`
            border: none;
            border-bottom: 1px solid #c3c3c3;
            border-radius: 0;
            padding: 5px 20px;
          `
        : css`
            border-color: transparent;
            width: 200px;
            height: 150px;
            padding: 20px 20px 10px;
          `}

    .button-content__text {
      color: ${COLORS.PRIMARY.GRAY_DARK};
    }

    &:hover,
    &:active {
      border-color: transparent;
      background-color: rgba(35, 47, 106, 0.1);
    }
  }
`;
