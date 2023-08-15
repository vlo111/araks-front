import styled from 'styled-components';
import { Col } from 'antd';

export const StyledAvatar = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #808080;
  transition: 0.5s;
`;

export const StyledCol = styled(Col)`
  display: flex;
  gap: 16px;
  align-items: center;
  color: #808080;
  font-family: 'Rajdhani', serif;
  transition: 0.5s;
  cursor: pointer;

  &:hover {
    color: #232f6a;

    & > ${StyledAvatar} {
      background: #232f6a;
    }
  }
`;

export const StyledHeader = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: black;
`;
