import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  width: 11rem;
  height: 2.5rem;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
  transition: height 1s ease;
  padding: 0 0 1.25rem 0;
  z-index: 2;
  background: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;

  .items {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 0 10px;
    flex-direction: column;
    gap: 0.5rem;

    .show-layout {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-radius: 0.25rem;
      border: 1px solid rgba(255, 255, 255, 0.5);
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%);
      box-shadow: 0 10px 10px 0 rgba(141, 143, 166, 0.2);
      backdrop-filter: blur(7px);
      min-height: 2.5rem;

      span {
        color: #808080;
        font-size: 1.25rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.0875rem;
      }
    }
  }

  &:hover {
    height: 12rem;
  }
`;

export const Items = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0 10px;
  flex-direction: column;
  gap: 0.5rem;

  .show-layout {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 0.25rem;
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%);
    box-shadow: 0 10px 10px 0 rgba(141, 143, 166, 0.2);
    backdrop-filter: blur(7px);
    min-height: 2.5rem;

    span {
      color: #808080;
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: 0.0875rem;
    }
  }
`;

export const Layout = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 0.25rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%);
  box-shadow: 0 10px 10px 0 rgba(141, 143, 166, 0.2);
  backdrop-filter: blur(7px);
  min-height: 2.5rem;

  span {
    color: #808080;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.0875rem;
  }

  &.item {
    &:hover {
      background: #666666;
    }
  }
`;
