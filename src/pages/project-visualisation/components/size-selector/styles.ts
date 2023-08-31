import styled from 'styled-components';
import { Button, Typography } from 'antd';

const Text = Typography;

export const StyledSizeWrapper = styled.div``;

export const StyledSize = styled(Text)`
  color: #414141;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1.4px;
  margin-bottom: 8px;
`;

export const StyledCircleOptions = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-wrap: wrap;
`;

export const StyledCircleOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
  cursor: pointer;
`;

export const StyledCircle = styled.div<{ isSelected: boolean; size: number }>`
  background: ${(props) => (props.isSelected ? '#232F6A' : 'transparent')};
  border: ${(props) => (props.isSelected ? 'none' : '2px solid #808080')};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  margin-bottom: 8px;
  &:focus-within {
    background: #232f6a;
  }
`;

export const StyledBorderOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  cursor: pointer;
  flex-wrap: wrap;
`;

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledBorder = styled.div<{ isSelected: boolean; size: number }>`
  background: ${(props) => (props.isSelected ? '#232F6A' : '#C3C3C3')};
  // border: ${(props) => (props.isSelected ? 'none' : '2px solid #808080')};
  width: 28px;
  height: ${(props) => props.size}px;
  margin-bottom: 22px;
  //margin-bottom: 8px;
  &:focus-within {
    background: #232f6a;
  }
`;

export const StyledDiv = styled.div`
  margin-right: 56px;
  &:last-child {
    margin-right: 0;
  }
`;

export const StyledNumber = styled(Text)`
  color: #232f6a;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1.12px;
  margin-top: 28px;
`;

export const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledButton = styled(Button)<{ isActive: boolean }>`
  &&& {
    width: 100%;
    padding: 0;
    color: ${({ isActive }) => (isActive ? 'white' : '#808080')};
    text-align: center;
    background: ${({ isActive }) => (isActive ? '#232f6a' : '#e0e0e0')};
    border: 1px solid #fff;
    border-radius: 4px;
    box-shadow: 0 3px 3px 0 rgba(141, 143, 166, 0.2);
    margin-right: 32px;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.4px;
    svg path {
      stroke: ${({ isActive }) => (isActive ? 'white' : '#C3C3C3')};
    }
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      background: #8c92af;
      color: white;
      svg path {
        stroke: white;
      }
    }
  }
`;

export const StyledSpan = styled.span`
  margin-left: 16px;
`;
