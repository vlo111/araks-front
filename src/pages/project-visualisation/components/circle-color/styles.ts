import styled from 'styled-components';

export const StyledColorBox = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #FFF;
  box-shadow: 0 3px 3px 0 rgba(141, 143, 166, 0.20);
  margin-right: 8px;
`

export const StyledInnerCircle = styled.div<{ color: string}>`
  position: absolute;
  width: 24px;
  height: 24px;
  border:3px solid ${({ color }) => color};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`

export const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`
