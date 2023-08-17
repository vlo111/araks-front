import { Avatar, Form, List, Skeleton } from 'antd';
import { useGetComments } from 'api/comments/use-get-comments';
import { Icon } from 'components/icon';
import { Text, Title } from 'components/typography';
import { ShowSafeText } from 'components/typography/show-safe-text';
import { COLORS } from 'helpers/constants';
import { DeleteComment } from './delete-comment';

import './index.css';

export const CommentData = () => {
  const { rowsData, count, isInitialLoading, isFetched } = useGetComments();
  const form = Form.useFormInstance();

  if (isFetched && !count) {
    return (
      <Title level={1} color={COLORS.PRIMARY.GRAY_DARK} align="center">
        No comments yet
      </Title>
    );
  }

  return (
    <List
      className="scroll-container"
      style={{ height: '100%', overflow: 'auto' }}
      loading={isInitialLoading}
      itemLayout="horizontal"
      dataSource={rowsData}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Icon
              color={COLORS.PRIMARY.BLUE}
              icon="arrow-up-left1"
              key="reply"
              size={20}
              style={{ cursor: 'pointer' }}
              onClick={() => form.setFieldValue('parent_id', item.id)}
            />,
            <DeleteComment id={item.id} key="delete" />,
          ]}
        >
          <Skeleton avatar title={false} loading={isInitialLoading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.user.avatar} />}
              title={<Text>{`${item.user.first_name} ${item.user.last_name}`}</Text>}
              description={<ShowSafeText text={item.comments} />}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};
