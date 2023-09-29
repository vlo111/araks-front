import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  width: 26rem;
  top: 176px;
  right: 0;
  display: flex;
  gap: 0.5rem;

  button {
    display: flex;
    align-items: center;
    color: #232f6a;
    height: 3rem;
    font-weight: 600;
    letter-spacing: 1.4px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%);
    box-shadow: 0 10px 10px 0 rgba(141, 143, 166, 0.2);
    backdrop-filter: blur(7px);
  }

  .reset {
    color: white;
    background: #232f6a;
    font-size: 20px;

    &:hover {
      color: white !important;
    }
  }

  .layout {
    min-width: 160px;
  }

  .combo {
    color: #808080;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.4px;
  }
`;
