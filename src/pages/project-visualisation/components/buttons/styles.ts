import { Button } from 'antd';
import styled from 'styled-components';

export const StyledButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 24px 44px 16px;
  margin-top: auto;
`;

export const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const StyledCleanButton = styled(Button)`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  border: 2px solid #414141;
  border-radius: 4px;
  letter-spacing: 1.4px;
  color: #414141;
  background: transparent;
  margin-right: 40px;
  &:hover {
    background: rgba(0, 0, 0, 0.06);
  }
`;

export const StyledAddButton = styled(Button)`
  width: 100%;
  font-weight: 600;
  border-radius: 4px;
  border: 1px solid #fff;
  color: #232f6a;
  background: #ced2de;
  margin-bottom: 16px;
`;

export const StyledRunButton = styled(Button)`
  &&& {
    width: 100%;
    font-size: 20px;
    font-weight: 700;
    border-radius: 4px;
    letter-spacing: 1.4px;
    color: #fff;
    background: #232f6a;
    &:hover {
      color: #fff;
      background: #001479;
    }
  }
`;
