import styled from 'styled-components';


export const StyledIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;
`
export const StyledText = styled.div`
  color: #414141;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1.4px;
  margin-bottom: 8px;
`

export const StyledDiv = styled.div<{isSelected: boolean}>`
  border: ${(props) => (props.isSelected ? '1px solid #232F6A' : '1px solid  rgba(111, 111, 111, 0.16)')};
  border-radius: 4px;
  margin: 0 8px 8px 0;
`

export const StyledIcon = styled.div`
  display: flex;
  margin: 0 auto;
`
