import styled, { css } from 'styled-components';

enum POSITION {
  LEFT = 'left',
  RIGHT = 'right',
}

export const ToolbarWrapper = styled.div<{ position: string }>`
  ${(props) =>
    props.position === POSITION.LEFT
      ? css`
          left: 32px;
        `
      : css`
          right: 32px;
        `}
  position: fixed;
  flex-direction: column;
  z-index: 1;
  bottom: 32px;
  width: 46px;
  display: flex;
  gap: 8px;

  .fit,
  .find {
    height: 46px;
    justify-content: center;

    &:hover {
      background-color: #e0e0e0;
    }

    &:active {
      svg {
        scale: 1.1;
      }
    }
  }

  .box {
    background: rgba(219, 219, 219, 0.5);
    backdrop-filter: blur(7px);
    border-radius: 4px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 0.1px solid rgba(255, 255, 255, 0.5);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%);
    box-shadow: rgba(141, 143, 166, 0.2) 0px 10px 10px 0px;
  }

  .zoom {
    justify-content: center;
    flex-direction: column;
    height: 93px;

    .separate {
      border: 1px solid #cdcdcd;
      width: 80%;
    }

    .zoomIn,
    .zoomOut {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;

      &:hover {
        background-color: #e0e0e0;
      }

      &:active {
        svg {
          scale: 1.1;
        }
      }
    }
  }
`;
