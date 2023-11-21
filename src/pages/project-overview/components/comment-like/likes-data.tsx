import { Avatar, Divider, List, Skeleton, Space } from 'antd';
import { useGetFavorites } from 'api/favorites/use-get-favorites';
import { LikesResponse } from 'api/types';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText, Title } from 'components/typography';
import { useAuth } from 'context/auth-context';
import { COLORS } from 'helpers/constants';
import { Dispatch, SetStateAction } from 'react';
import { formatTimeDifference, getAvatarPath } from 'helpers/utils';

type Props = {
  setUserLikedProject: Dispatch<SetStateAction<undefined | boolean>>;
};

export const LikesData = ({ setUserLikedProject }: Props) => {
  const { user } = useAuth();
  const { rowsData, count, isInitialLoading, isFetched } = useGetFavorites({
    onSuccess: (data: LikesResponse) => {
      if (user && data && data?.rows?.find((item) => item.user.id === user?.id)) {
        setUserLikedProject(true);
        return;
      }
      setUserLikedProject(false);
    },
  });

  if (isFetched && !count) {
    return (
      <Title level={1} color={COLORS.PRIMARY.GRAY_DARK} align="center">
        No likes yet
      </Title>
    );
  }

  if (isInitialLoading) {
    return <Skeleton avatar title={false} loading={isInitialLoading} active />;
  }
  return (
    <List
      itemLayout="horizontal"
      dataSource={rowsData}
      renderItem={(item) => {
        return (
          <>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={getAvatarPath(item.user.avatar)} />}
                title={
                  <VerticalSpace size={0}>
                    <Space>
                      <SecondaryText
                        strong
                        color={COLORS.PRIMARY.BLUE}
                      >{`${item.user.first_name} ${item.user.last_name}`}</SecondaryText>
                      <SecondaryText> liked your project</SecondaryText>
                    </Space>
                    <SecondaryText color={COLORS.PRIMARY.GRAY}>{formatTimeDifference(item.created_at)}</SecondaryText>
                  </VerticalSpace>
                }
              />
            </List.Item>
            <Divider style={{ margin: '0' }} />
          </>
        );
      }}
    />
  );
};
