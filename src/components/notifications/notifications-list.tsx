import { Divider, List, Skeleton } from 'antd';
import { useGetNotificationsAllData } from 'api/notifications/use-get-notifications-all-data';
import { NotificationsData } from 'api/types';
import { Dispatch, SetStateAction } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NotificationItem } from './notification-item';
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
        height: '50vh',
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
          renderItem={(item) => <NotificationItem item={item} key={item.id} setResult={setResult} setPage={setPage} />}
        />
      </InfiniteScroll>
    </div>
  );
};
