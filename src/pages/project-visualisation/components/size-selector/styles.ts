import styled from 'styled-components';
import { Typography } from 'antd';

const Text = Typography;

export const StyledSizeWrapper = styled.div`
  margin-bottom: 22px;
`;

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

export const StyledCircle = styled.div<{ isSelected: boolean,size:number }>`
  background: ${(props) => (props.isSelected ? '#232F6A' : 'transparent')};
  border: ${(props) => (props.isSelected ? 'none' : '3px solid #808080')};
  width: ${(props) => props.size}px;
  height:  ${(props) => props.size}px;
  border-radius: 50%;
  margin-bottom: 8px;
  &:focus-within {
    background: #232f6a;
  }
`;

export const StyledNumber = styled(Text)`
  color: #232f6a;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1.12px;
`;
