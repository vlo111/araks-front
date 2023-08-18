import styled from 'styled-components';
import dotImage from '../../../project-visualisation/components/icons/dots.svg';

export const HelpContainer = styled.div`
  & canvas {
    background: url(${dotImage});
  }
`;
