import { useMemo } from 'react';
import styled from 'styled-components';
import { Button, Dropdown } from 'antd';
import { useAuth } from 'context/auth-context';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { ReactComponent as UserProfileSvg } from './icon/user-profile.svg';
import { ReactComponent as SignOutSvg } from './icon/sign-out.svg';
import './profile.css';

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

  const items: ItemType[] = useMemo(
    () => [
      {
        key: '0',
        label: <a href="profile">View profile</a>,
        icon: <UserProfileSvg />,
      },
      {
        type: 'divider',
      },
      {
        key: '1',
        label: <div onClick={() => logout()}>Log Out</div>,
        icon: <SignOutSvg />,
      },
    ],
    [logout]
  );

  return (
    <Wrapper>
      <Dropdown overlayClassName="profile-settings" menu={{ items }} trigger={['click']}>
        <Button icon={<img src={user?.avatar} alt={user?.first_name} />} />
      </Dropdown>
    </Wrapper>
  );
};
