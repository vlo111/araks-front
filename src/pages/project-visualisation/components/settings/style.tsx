import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  width: 12rem;
  right: 10px;
  top: 176px;
  button {
    color: #232f6a;
    font-weight: 600;
    letter-spacing: 1.4px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%);
    box-shadow: 0 10px 10px 0 rgba(141, 143, 166, 0.2);
    backdrop-filter: blur(7px);
  }
`;
