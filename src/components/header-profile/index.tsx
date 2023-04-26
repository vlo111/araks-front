import { Button } from 'antd';
import { useAuth } from 'context/auth-context';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../helpers/constants';

const Wrapper = styled.div`
  display: flex;

  button {
    padding: 0;
    border: none;

    img {
      width: 40px;
      border-radius: 4px;
    }
  }
`;

export const HeaderProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Button onClick={() => navigate(PATHS.PROFILE)} icon={<img src={user?.avatar} alt={user?.first_name} />} />
    </Wrapper>
  );
};
