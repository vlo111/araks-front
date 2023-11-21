import { Button as ButtonComponent } from 'antd';
import { textSizeMedia } from 'components/typography/text';
import { changeHeight } from 'helpers/styles';
import styled, { css } from 'styled-components';
import { COLORS } from 'helpers/constants';

export const Button = styled(ButtonComponent)`
  ${(props) =>
    !props.size
      ? css`
          ${changeHeight}
        `
      : ''}
  ${textSizeMedia}
  &.ant-btn-default {
    span {
      color: ${COLORS.PRIMARY.GRAY_DARK};
    }
  }

  &.ant-btn-default:disabled {
    background-color: ${COLORS.PRIMARY.WHITE};
    border-color: ${COLORS.PRIMARY.SILVER};

    span {
      color: ${COLORS.PRIMARY.SILVER};
    }
  }

  &.ant-btn-default:not(:disabled) {
    &:hover,
    &:active {
      background: ${COLORS.PRIMARY.SILVER_LIGHT};

      span {
        color: ${COLORS.PRIMARY.BLUE};
      }
    }
  }
`;

export { ButtonWithIcon } from './button-with-icon';
export { CreateNewProjectButton } from './create-new-project-button';
export { ProjectButton } from './project-button';
export { SignUpButton } from './sign-up-button';
export { AddFolderButton } from './add-folder-button';
export { FolderButton } from './folder-button';
export { LikeButton } from './like-button';
export { IconButton } from './icon-button';
export { AddType } from './add-type';
export { GridConnectionButton } from './grid-connection-button';
