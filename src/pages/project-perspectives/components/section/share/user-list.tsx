import { useMemo } from 'react';
import { Divider, List, Space } from 'antd';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { VerticalSpace } from 'components/space/vertical-space';
import { Icon } from 'components/icon';
import { Text } from 'components/typography';
import { useGetPerspectiveUsers } from 'api/perspective/shared-users/use-get-perspecive-users';
import { UserListItem } from './user-list-item';
import { getAvatarPath } from 'helpers/utils';

export const UserList = ({ perspectiveId }: { perspectiveId?: string }) => {
  const { perspective: { id } = { id: '' } } = useSchema() || {};

  const { shared } = useGetPerspectiveUsers({ id: perspectiveId || id });

  const data = useMemo(
    () =>
      shared?.map(({ perspective_users: user, role }) => ({
        id: user.id,
        title: user.email,
        value: role,
        avatar: getAvatarPath(user.avatar),
      })),
    [shared]
  );

  return (
    <VerticalSpace size={8}>
      <Space size={9} style={{ lineHeight: 1 }}>
        <Icon fillRule="evenodd" icon="public" size={25} />
        <Text style={{ fontWeight: 500 }} color="#C5C5C5">
          Shared with
        </Text>
      </Space>
      <Divider style={{ margin: '0', backgroundColor: '#C5C5C5' }} />
      <List
        style={{
          height: '350px',
          overflow: 'auto',
        }}
        dataSource={data}
        renderItem={(item, index) => <UserListItem id={perspectiveId || (id ?? '')} index={index} user={item} />}
      />
    </VerticalSpace>
  );
};
