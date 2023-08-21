import { Avatar, Form, List, Skeleton, Space } from 'antd';
import { useGetComments } from 'api/comments/use-get-comments';
import { CommentData } from 'api/types';
import { Icon } from 'components/icon';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText, Text, Title } from 'components/typography';
import { ShowSafeText } from 'components/typography/show-safe-text';
import { useAuth } from 'context/auth-context';
import dayjs from 'dayjs';
import { COLORS } from 'helpers/constants';
import { DeleteComment } from './delete-comment';

import './index.css';

interface CommentListProps {
  data: CommentData[];
  level: number;
  rowsData: CommentData[];
}

const CommentList = ({ data, level, rowsData }: CommentListProps) => {
  const form = Form.useFormInstance();
  const { user } = useAuth();

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => {
        const childData = rowsData.filter((comment) => comment.parent_id === item.id);
        return (
          <VerticalSpace>
            <List.Item style={{ paddingLeft: level * 30 }}>
              <List.Item.Meta
                avatar={<Avatar src={item.user.avatar} />}
                title={
                  <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <VerticalSpace size={0}>
                      <Text strong color={COLORS.PRIMARY.BLUE}>{`${item.user.first_name} ${item.user.last_name}`}</Text>
                      <SecondaryText color={COLORS.PRIMARY.GRAY}>
                        {dayjs(item.created_at).format('DD MM YYYY')}
                      </SecondaryText>
                    </VerticalSpace>
                    <Space>
                      <Icon
                        color={COLORS.PRIMARY.BLUE}
                        icon="arrow-up-left1"
                        key="reply"
                        size={20}
                        style={{ cursor: 'pointer' }}
                        onClick={() => form.setFieldValue('parent_id', item.id)}
                      />
                      {user && item.user.id === user?.id && <DeleteComment id={item.id} key="delete" />}
                    </Space>
                  </Space>
                }
                description={<ShowSafeText text={item.comments} />}
              />
            </List.Item>
            {childData.length ? <CommentList data={childData} rowsData={rowsData} level={level + 1} /> : <></>}
          </VerticalSpace>
        );
      }}
    />
  );
};

export const CommentDataShow = () => {
  const { rowsData, count, isInitialLoading, isFetched } = useGetComments();

  if (isFetched && !count) {
    return (
      <Title level={1} color={COLORS.PRIMARY.GRAY_DARK} align="center">
        No comments yet
      </Title>
    );
  }

  if (isInitialLoading) {
    return <Skeleton avatar title={false} loading={isInitialLoading} active />;
  }

  // Create a list of top-level comments (comments without parents)
  const topLevelComments = rowsData.filter((comment) => comment.parent_id === null);

  return (
    <div style={{ height: '100%', overflow: 'auto' }} className="scroll-container">
      {topLevelComments.map((comment) => (
        <CommentList key={comment.id} data={[comment]} rowsData={rowsData} level={0} />
      ))}
    </div>
  );
};
