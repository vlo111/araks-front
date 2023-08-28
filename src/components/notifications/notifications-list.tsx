import { CloseOutlined } from '@ant-design/icons';
import { Avatar, Col, Descriptions, Divider, List, Row, Skeleton } from 'antd';
import { useDeleteNotification } from 'api/notifications/use-delete-notification';
import { useGetNotificationsAllData } from 'api/notifications/use-get-notifications-all-data';
import { NotificationsData } from 'api/types';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { formatTimeDifference } from 'helpers/utils';
import { Dispatch, SetStateAction } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NotificationsPage, NotificationsStatusFilter } from './types';

type Props = {
  page: NotificationsPage;
  result: NotificationsData[];
  setResult: Dispatch<SetStateAction<NotificationsData[]>>;
  setPage: Dispatch<SetStateAction<NotificationsPage>>;
};

export const NotificationsList = ({ page: { status, ...page }, result, setResult, setPage }: Props) => {
  const { count, isInitialLoading } = useGetNotificationsAllData(
    {
      ...page,
      ...(status === NotificationsStatusFilter.Unread ? { status: NotificationsStatusFilter.Unread } : {}),
    },
    {
      onSuccess: ({ rows, count }) => {
        setResult((prev) => [...prev, ...rows]);
      },
    }
  );

  const { mutate: deleteNotification } = useDeleteNotification();

  const loadMoreData = () => {
    if (isInitialLoading) {
      return;
    }
    setPage((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  return (
    <div
      id="scrollableDiv"
      className="scroll-container"
      style={{
        height: '40vh',
        overflow: 'auto',
      }}
    >
      <InfiniteScroll
        dataLength={result.length}
        next={loadMoreData}
        hasMore={result.length < count}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={result}
          itemLayout="horizontal"
          renderItem={(item) => (
            <VerticalSpace key={item.id} size={0}>
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar src={item.user.avatar} />}
                  title={
                    <Row justify="space-between" align="top">
                      <Col span={22}>
                        <SecondaryText
                          color={COLORS.PRIMARY.BLUE}
                        >{`${item.user.first_name} ${item.user.last_name} `}</SecondaryText>
                        <SecondaryText>{item.text}</SecondaryText>
                      </Col>
                      <Col span={2}>
                        <CloseOutlined style={{ color: '#232F6A' }} onClick={() => deleteNotification(item.id)} />
                      </Col>
                    </Row>
                  }
                  description={
                    <Descriptions
                      items={[
                        {
                          key: item.id,
                          label: 'Project',
                          children: item.projects.title,
                        },
                      ]}
                    />
                  }
                />
              </List.Item>
              <SecondaryText color={COLORS.PRIMARY.GRAY_LIGHT}>{formatTimeDifference(item.created_at)}</SecondaryText>
              <Divider style={{ margin: '0' }} />
            </VerticalSpace>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
