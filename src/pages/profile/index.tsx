import { Row } from 'antd';
import styled from 'styled-components';
import { InfoPanel } from '../../components/profile/info-panel';
import { EditWrapper } from '../../components/profile/edit/wrapper';

const Wrapper = styled(Row)`
  height: calc(100% + 60px);
  width: calc(100% + 80px);
  margin-left: -40px;
  margin-top: -30px;
`;

export const Profile = () => {
  return (
    <Wrapper>
      <InfoPanel />
      <EditWrapper />
    </Wrapper>
  );
};
