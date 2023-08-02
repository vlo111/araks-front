import { Avatar, List } from 'antd';
import { UserProjectRole } from 'api/types';
import { Share } from 'components/dropdown';
import { SHARE_OPTIONS } from 'components/dropdown/constants';
import { Text } from 'components/typography';
import { useAuth } from 'context/auth-context';
import { useProject } from 'context/project-context';
import { PATHS } from 'helpers/constants';
import { useIsXXlScreen } from 'hooks/use-breakpoint';
import { useLocation } from 'react-router-dom';

export const SharedWith = () => {
  const { projectInfo } = useProject();
  const location = useLocation();

  const isXXl = useIsXXlScreen();
  const { user: logedInUser } = useAuth();
  const data = [
    {
      title: logedInUser?.email,
      value: SHARE_OPTIONS[2].value,
      avatar: logedInUser?.avatar,
    },
  ];
  return (
    <List
      itemLayout={isXXl ? 'horizontal' : 'vertical'}
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item
          actions={[
            location.pathname === PATHS.PROJECT_CREATE || projectInfo?.role === UserProjectRole.Owner ? (
              <Share defaultValue={item.value} key={item.title} />
            ) : (
              SHARE_OPTIONS.find((option) => option.value === item.value)?.label
            ),
          ]}
        >
          <List.Item.Meta avatar={<Avatar src={item.avatar} />} description={<Text>{item.title}</Text>} />
        </List.Item>
      )}
    />
  );
};
