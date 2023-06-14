import { Avatar, List } from 'antd';
import { Text } from 'components/typography';
import { SelectItems } from 'components/select/share-select';
import { ROLE_OPTIONS } from 'components/form/share-input-item';
import styled from 'styled-components';
import React from 'react';
import { useCreatePerspectiveUser } from 'api/perspective/shared-users/use-create-perspective-user';

type Props = React.FC<{
  id: string;
  index: number;
  user: { id: string; title: string; value: string; avatar: string };
}>;

const BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 0],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -0],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
};

const Share = styled.div`
  && {
    .ant-select-selector {
      border-color: white !important;
      background: linear-gradient(91.54deg, rgba(232, 235, 248, 0.7) 5.25%, rgba(232, 235, 248, 0.2) 97.48%);
      align-items: center;
      min-width: 134px;
      height: 40px;
    }
  }
`;

export const UserListItem: Props = ({ id, index, user }) => {
  const { mutate } = useCreatePerspectiveUser({}, id);

  const value = user.value === 'owner' ? `Owner` : ROLE_OPTIONS.find((r) => r.value === user.value)?.value;

  const changeRole = (role: string) => {
    mutate({
      perspective_user_id: user.id,
      role,
    });
  };

  return (
    <List.Item
      actions={[
        <Share key={index}>
          <SelectItems
            builtinPlacements={BUILT_IN_PLACEMENTS}
            onChange={changeRole}
            disabled={user.value === 'owner'}
            popupClassName="role-dropdown"
            value={value}
            options={ROLE_OPTIONS}
          />
        </Share>,
      ]}
    >
      <List.Item.Meta avatar={<Avatar src={user.avatar} />} description={<Text>{user.title}</Text>} />
    </List.Item>
  );
};
