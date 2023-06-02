import { css } from 'styled-components';
import { screenSize } from './constants';

export const changeHeight = css`
  @media (min-width: ${screenSize.lg}) {
    height: 30px;
    font-size: 15px;
    line-height: 1.3;
  }

  @media (min-width: ${screenSize.xxl}) {
    height: 40px;
    font-size: 20px;
    line-height: 1.3;
  }
`;

export const placeholderSize = css`
  @media (max-width: ${screenSize.xxl}) {
    font-size: 15px;
    line-height: 1.4;
  }
`;
