import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  width: 13rem;
  right: 10px;
  top: 176px;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  button {
    display: flex;
    align-items: center;
    color: #232f6a;
    width: 12rem;
    height: 3rem;
    font-weight: 600;
    letter-spacing: 1.4px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%);
    box-shadow: 0 10px 10px 0 rgba(141, 143, 166, 0.2);
    backdrop-filter: blur(7px);
  }
`;
