import { useState, Dispatch, SetStateAction } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Avatar, Col, Descriptions, Divider, List, Row, Space, Spin } from 'antd';
import { useDeleteNotification } from 'api/notifications/use-delete-notification';
import { useNotificationStatusUpdate } from 'api/notifications/use-notitication-status-update';
import { NotificationsData } from 'api/types';
import { Button } from 'components/button';
import { SecondaryText } from 'components/typography';
import { COLORS, PATHS } from 'helpers/constants';
import { formatTimeDifference } from 'helpers/utils';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { NotifyBadge } from '.';
import { NotificationsPage } from './types';

const StyledVerticalSpace = styled(({ isHovered, ...props }) => <Space direction="vertical" {...props} />)`
  background: linear-gradient(136deg, rgba(237, 239, 248, 0.45) 0%, rgba(237, 239, 248, 0.2) 100%);
  width: 99%;

  &.notification-unread {
    background: linear-gradient(136deg, rgba(153, 159, 189, 0.45) 0%, rgba(222, 226, 243, 0.2) 100%);
  }

  &:hover {
    border: 1px solid #fff;
    box-shadow: 0px 3px 6px 0px rgba(65, 65, 65, 0.16);
  }

  ${(props) =>
    props.isHovered &&
    css`
      border: 1px solid #fff;
      background: linear-gradient(136deg, rgba(234, 174, 178, 0.45) 0%, rgba(237, 239, 248, 0.2) 100%);
    `}

  .delete-notification {
    svg {
      color: #232f6a;
    }

    &:hover {
      svg {
        color: #cf000f; /* Color when .delete-notification is hovered */
      }
    }
  }
`;

type Props = {
  item: NotificationsData;
  setResult: Dispatch<SetStateAction<NotificationsData[]>>;
  setPage: Dispatch<SetStateAction<NotificationsPage>>;
};

export const NotificationItem = ({ item, setResult, setPage }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const { mutate: deleteNotification, isLoading } = useDeleteNotification({
    onSuccess: (data: boolean, variables: string) => {
      setResult((res) => res.filter((item) => item.id !== variables));
    },
  });
  const { mutate: updateNotificationStatus, isLoading: isUpdateLoading } = useNotificationStatusUpdate({
    onSuccess: (data: boolean, variables: string) => {
      setResult((res) => res.map((item) => ({ ...item, status: item.id === variables ? 'read' : item.status })));
    },
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <Spin spinning={isLoading || isUpdateLoading}>
      <StyledVerticalSpace
        size={0}
        className={`notification-item ${item.status !== 'read' ? 'notification-unread' : ''}`}
        isHovered={isHovered}
      >
        <List.Item key={item.id}>
          <List.Item.Meta
            style={{ paddingLeft: '16px' }}
            avatar={
              item.status === 'read' ? (
                <Avatar src={item.user.avatar} />
              ) : (
                <NotifyBadge color="#F97070" dot offset={[-5, 10]}>
                  <Avatar src={item.user.avatar} />
                </NotifyBadge>
              )
            }
            title={
              <Row justify="space-between" align="top">
                <Col span={22}>
                  <SecondaryText
                    color={COLORS.PRIMARY.BLUE}
                  >{`${item.user.first_name} ${item.user.last_name} `}</SecondaryText>
                  <SecondaryText>{item.text}</SecondaryText>
                </Col>
                <Col span={2}>
                  <CloseOutlined
                    className="delete-notification"
                    onClick={() => {
                      deleteNotification(item.id);
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                </Col>
              </Row>
            }
            description={
              <Descriptions
                column={1}
                size="small"
                items={[
                  {
                    key: item.id,
                    label: 'Project',
                    children: (
                      <Button
                        style={{ padding: 0, height: '100%', lineHeight: '1' }}
                        type="link"
                        onClick={() => {
                          updateNotificationStatus(item.id);
                          navigate(PATHS.PROJECT_OVERVIEW.replace(':id', item.project_id));
                        }}
                      >
                        <SecondaryText>{item.projects.title}</SecondaryText>
                      </Button>
                    ),
                  },
                  ...(item.action_type === 'comment-node'
                    ? [
                        {
                          key: 'node',
                          label: 'Node',
                          children: (
                            <Button
                              style={{ padding: 0, height: '100%', lineHeight: '1' }}
                              type="link"
                              onClick={() => {
                                updateNotificationStatus(item.id);
                                navigate(
                                  PATHS.NODE_OVERVIEW.replace(':id', item.project_id).replace(
                                    ':node_type_id',
                                    item.node_id
                                  )
                                );
                              }}
                            >
                              <SecondaryText>{item.nodes?.name || 'NO Name'}</SecondaryText>
                            </Button>
                          ),
                        },
                      ]
                    : []),
                ]}
              />
            }
          />
        </List.Item>
        <SecondaryText as="div" style={{ paddingLeft: '16px', marginBottom: '12px' }} color={COLORS.PRIMARY.GRAY}>
          {formatTimeDifference(item.created_at)}
        </SecondaryText>
        <Divider style={{ margin: '0' }} />
      </StyledVerticalSpace>
    </Spin>
  );
};
