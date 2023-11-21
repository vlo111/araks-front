import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button, Dropdown } from 'antd';
import { useAuth } from 'context/auth-context';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { ReactComponent as UserProfileSvg } from './icon/user-profile.svg';
import { ReactComponent as SignOutSvg } from './icon/sign-out.svg';
import { Link } from 'react-router-dom';
import './profile.css';
import { PATHS } from 'helpers/constants';

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
  const { user, logout } = useAuth();

  const [avatar, setAvatar] = useState(user?.avatar);

  useEffect(() => {
    setAvatar(user?.avatar);
  }, [user?.avatar]);

  const items: ItemType[] = useMemo(
    () => [
      {
        key: '0',
        label: <Link to={PATHS.PROFILE}>View profile</Link>,
        icon: <UserProfileSvg />,
      },
      {
        type: 'divider',
      },
      {
        key: '1',
        onClick: ({ key, keyPath, domEvent }) => {
          logout();
        },
        label: <div>Log Out</div>,
        icon: <SignOutSvg />,
      },
    ],
    [logout]
  );

  return (
    <Wrapper>
      <Dropdown overlayClassName="profile-settings" menu={{ items }} trigger={['click']}>
        <Button icon={<img src={avatar} alt={user?.first_name} />} />
      </Dropdown>
    </Wrapper>
  );
};
