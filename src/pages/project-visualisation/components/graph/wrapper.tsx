import styled, { css } from 'styled-components';
import dotsImage from '../icons/dots.svg';

const contextMenu = css`
  .g6-component-contextmenu {
    background: linear-gradient(122.32deg, rgba(237, 239, 248, 0.9) 3.09%, rgba(237, 239, 248, 0.4) 99.26%);
    border: 1px solid #ffffff;
    box-shadow: 0 10px 10px rgba(141, 143, 166, 0.2);
    backdrop-filter: blur(7px);
    border-radius: 4px;
    padding: 0;

    .menu {
      display: flex;
      flex-direction: column;
      font-weight: 600;
      font-size: 20px;
      letter-spacing: 0.07em;
      color: #808080;

      span {
        color: #808080;
        cursor: pointer;
        padding: 0.5rem 1rem;

        &:hover {
          color: #232f6a;
          background: linear-gradient(90deg, rgba(35, 47, 106, 0.2) 0%, rgba(35, 47, 106, 0.2) 100%);
        }

        &.delete {
          color: #c51c16;
        }
      }
    }
  }
`;

export const Wrapper = styled.div`
  margin-left: 480px;
  z-index: 0;
  ${contextMenu};

  canvas {
    background: url(${dotsImage});
  }
`;
