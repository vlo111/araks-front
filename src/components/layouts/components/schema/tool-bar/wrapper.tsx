import React from 'react';
import styled from 'styled-components';
import { Toolbar } from './bar';

const ToolbarPanel = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 46px;
  display: flex;
  flex-direction: column;
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
    border: 1px solid rgba(111, 111, 111, 0.16);
    box-shadow: 0 10px 10px rgba(141, 143, 166, 0.2);
    backdrop-filter: blur(7px);
    border-radius: 4px;
    display: flex;
    align-items: center;
    cursor: pointer;
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

export const ToolbarWrapper: React.FC = () => (
  <ToolbarPanel>
    <Toolbar />
  </ToolbarPanel>
);
