import { COLORS } from 'helpers/constants';
import styled from 'styled-components';

const background = `linear-gradient(122.32deg, rgba(237, 239, 248, 0.9) 3.09%, rgba(237, 239, 248, 0.4) 99.26%),
    linear-gradient(0deg, ${COLORS.PRIMARY.WHITE}, ${COLORS.PRIMARY.WHITE})`;

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  position: fixed;
  right: 0;
  width: 600px;
  height: 100%;
  padding-top: 24px;
  background: ${background};
  box-shadow: 0 10px 10px 0 #8d8fa633;
  border: 1px solid ${COLORS.PRIMARY.WHITE};
  z-index: 1;
`;
