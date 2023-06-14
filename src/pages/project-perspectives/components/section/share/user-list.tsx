import { useSchema } from 'components/layouts/components/schema/wrapper';
import { Divider, List, Space } from 'antd';
import { VerticalSpace } from 'components/space/vertical-space';
import { Icon } from 'components/icon';
import { Text } from 'components/typography';
import { useGetPerspectiveUsers } from 'api/perspective/shared-users/use-get-perspecive-users';
import { useIsXXlScreen } from 'hooks/use-breakpoint';
import { UserListItem } from './user-list-item';

export const UserList = () => {
  const { perspective } = useSchema() || {};

  const isXXl = useIsXXlScreen();

  const { id } = perspective;

  const { shared } = useGetPerspectiveUsers({ id });

  const data = shared?.map(({ perspective_users: user, role }) => ({
    title: user.email,
    value: role,
    avatar: user.avatar,
  }));

  return (
    <VerticalSpace size={8}>
      <Space size={9} style={{ lineHeight: 1 }}>
        <Icon fillRule="evenodd" icon="public" size={25} />
        <Text style={{ fontWeight: 500 }} color="#C5C5C5">
          Shared users
        </Text>
      </Space>
      <Divider style={{ margin: '0', backgroundColor: '#C5C5C5' }} />
      <List
        itemLayout={isXXl ? 'horizontal' : 'vertical'}
        dataSource={data}
        renderItem={(item, index) => <UserListItem id={id ?? ''} index={index} user={item} />}
      />
    </VerticalSpace>
  );
};
