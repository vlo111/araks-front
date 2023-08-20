import styled from 'styled-components';
import { Collapse, Typography } from 'antd';

const Text = Typography

export const StyledCollapse = styled(Collapse)`
  background: linear-gradient(137deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%);
  box-shadow: -1px 4px 4px 0 rgba(128, 128, 128, 0.1);
  border-radius: 0;
`;

export const StyledText = styled(Text)`
  color: #414141;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1.4px;
  margin-bottom: 8px;
`
