import { Button, ButtonProps } from 'antd';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  border: none;
  text-align: start;

  span {
    color: ${COLORS.PRIMARY.WHITE};
  }

  .ant-btn-icon path {
    fill: ${COLORS.PRIMARY.WHITE};
  }
`;

type Props = ButtonProps & {
  backgroundColor: string;
};

export const GridConnectionButton = ({ backgroundColor, ...props }: Props) => {
  return <StyledButton size="middle" style={{ backgroundColor }} {...props} />;
};
