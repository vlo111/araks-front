import { Avatar, List, Skeleton } from 'antd';
import { useGetComments } from 'api/comments/use-get-comments';
import { Icon } from 'components/icon';
import { Text, Title } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { DeleteComment } from './delete-comment';

export const CommentData = () => {
  const { rowsData, count, isInitialLoading, isFetched } = useGetComments();

  if (isFetched && !count) {
    return (
      <Title level={1} color={COLORS.PRIMARY.GRAY_DARK} align="center">
        No comments yet
      </Title>
    );
  }
  return (
    <List
      className="demo-loadmore-list"
      loading={isInitialLoading}
      itemLayout="horizontal"
      //   loadMore={loadMore}
      dataSource={rowsData}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Icon color={COLORS.PRIMARY.BLUE} icon="arrow-up-left1" key="reply" />,
            <DeleteComment id={item.id} key="delete" />,
          ]}
        >
          <Skeleton avatar title={false} loading={isInitialLoading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.user.avatar} />}
              title={<Text>{`${item.user.first_name} ${item.user.last_name}`}</Text>}
              description={item.comments}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};
