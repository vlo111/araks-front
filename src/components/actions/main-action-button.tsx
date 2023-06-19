import { Button, ButtonProps, Tooltip } from 'antd';
import { COLORS } from 'helpers/constants';
import { ReactElement } from 'react';
import styled from 'styled-components';

import './action-tooltip.css';

const StyledButton = styled(Button)`
  border: none;
  background-color: transparent;

  &&:hover {
    background: #232f6a;

    .anticon {
      color: ${COLORS.PRIMARY.WHITE};
    }
  }
`;

type Props = ButtonProps & {
  helpText: string;
  icon: ReactElement;
};

export const MainActionButton = ({ icon, helpText, ...props }: Props) => {
  return (
    <Tooltip overlayClassName="action-tooltip" title={helpText} arrow={false} placement="bottom">
      <StyledButton shape="circle" icon={icon} {...props} />
    </Tooltip>
  );
};
