import { Button as Component, ButtonProps } from 'antd';
import styled from 'styled-components';

import { COLORS } from '../../helpers/constants';
import { ReactComponent as Settings } from '../icons/settings.svg';
import { useHover } from '../../hooks/use-hover';
import { VerticalSpace } from 'components/space/vertical-space';

type Props = ButtonProps & {
  iconType: 'settings';
};

type ButtonContentType = {
  icon: JSX.Element;
  text: string;
};

const iconTypeData = {
  settings: {
    icon: <Settings />,
    text: 'settings',
  },
};

const ButtonContent = ({ icon, text }: ButtonContentType) => (
  <VerticalSpace size="small">
    {icon}
    <div className="button-content__text">{text}</div>
  </VerticalSpace>
);

const Button = styled(({ iconType, ...props }: Props) => <Component {...props} {...iconTypeData[iconType]} />)`
  &.ant-btn-default {
    border-color: ${COLORS.PRIMARY.WHITE};

    &:hover,
    &:active {
      border-color: ${COLORS.PRIMARY.WHITE};
    }
  }
`;

const ButtonStyled = styled(({ iconType, ...props }: Props) => (
  <Component {...props}>
    <ButtonContent {...iconTypeData[iconType]} />
  </Component>
))`
  &.ant-btn-default {
    border-color: ${COLORS.PRIMARY.WHITE};

    &:hover,
    &:active {
      border-color: ${COLORS.PRIMARY.WHITE};
    }
  }
`;

export const IconButton = (props: Props) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return <div ref={hoverRef}>{!isHovered ? <ButtonStyled {...props} /> : <Button {...props} />}</div>;
};
