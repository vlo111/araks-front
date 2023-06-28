import { ButtonProps, Button } from 'antd';
import { screenSize } from 'helpers/constants';
import styled, { css } from 'styled-components';

type WrapperProps = ButtonProps & {
  rowsCount: number;
  dataSheetTableSize: number;
  wrapperWidth?: number;
};

export const VerticalButtonWrapper = styled(
  ({ rowsCount, dataSheetTableSize, wrapperWidth, ...props }: WrapperProps) => <Button {...props} />
)`
  & {
    height: 100%;
    @media (min-width: ${screenSize.xxl}) {
      width: ${({ wrapperWidth }) => wrapperWidth ?? 64}px;
    }
    width: ${({ wrapperWidth }) => wrapperWidth ?? 40}px;
    z-index: 5;
    position: absolute;
    @media (min-width: ${screenSize.xxl}) {
      ${(props) =>
        props.rowsCount > props.dataSheetTableSize - 64
          ? css`
          right 0;
        `
          : css`
              left: ${props.rowsCount}px;
            `}
    }

    ${(props) =>
      props.rowsCount > props.dataSheetTableSize - 40
        ? css`
        right 0;
      `
        : css`
            left: ${props.rowsCount}px;
          `}

    background: linear-gradient(179.76deg, rgba(213, 215, 223, 0.9) 0%, rgba(213, 215, 223, 0.3) 99.91%);
    backdrop-filter: blur(2px);
    border: none;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 16px;
    padding-top: 30px;

    .property-text {
      display: none;
      writing-mode: vertical-rl;
      text-orientation: mixed;
    }

    &:hover {
      background: linear-gradient(179.75deg, #bec4db 0%, rgba(192, 198, 219, 0.3) 99.91%);

      .property-text {
        display: inline;
      }
    }
  }
`;
