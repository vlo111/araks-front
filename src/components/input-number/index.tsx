import { InputNumber as InputComponent } from 'antd';
import { changeHeight, placeholderSize } from 'helpers/styles';
import styled, { css } from 'styled-components';

export const InputNumber = styled(InputComponent)`
  background: linear-gradient(91.78deg, rgba(255, 255, 255, 0.64) 6.81%, rgba(255, 255, 255, 0.16) 100%);

  ${(props) =>
    !props.size
      ? css`
          ${changeHeight}
        `
      : ''}

  ::placeholder {
    ${placeholderSize}
  }
`;
