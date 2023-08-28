import { Badge as BadgeComponent, Col, Popover, Radio, Row } from 'antd';
import { NotificationsData } from 'api/types';
import { Button } from 'components/button';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText } from 'components/typography';
import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Bell } from '../icons/bell.svg';
import { NotificationsList } from './notifications-list';
import { NotificationsPage, NotificationsStatusFilter } from './types';

const Badge = styled(BadgeComponent)`
  .ant-badge-dot {
    background: #f97070;
    box-shadow: 0px 3px 6px rgba(249, 112, 112, 0.7);
    width: 15px;
    height: 15px;
  }
`;

const StyledRadioButton = styled(Radio.Group)`
  .ant-radio-button-wrapper {
    border: none;

    &.ant-radio-button-wrapper-checked {
      border-radius: 4px;
      background: #232f6a;
      height: '100%';

      :active,
      :hover {
        background: #232f6a;
        height: '120%';
      }
    }
  }

  .ant-radio-button-wrapper:nth-child(2)::before {
    content: none;
  }
`;

export const Notifications = () => {
  const [page, setPage] = useState<NotificationsPage>({
    page: 1,
    size: 5,
    status: NotificationsStatusFilter.All,
  });
  const [result, setResult] = useState<NotificationsData[]>([]);

  return (
    <Popover
      arrow={false}
      autoAdjustOverflow
      placement="bottom"
      destroyTooltipOnHide
      trigger="click"
      title={
        <VerticalSpace>
          <Row justify="space-between" align="middle">
            <Col>
              <SecondaryText style={{ fontWeight: '500', letterSpacing: '1.28px' }} color="#001479">
                Notifications
              </SecondaryText>
            </Col>
            <Col>
              <Button type="link">
                <SecondaryText color="#001479" underline style={{ fontWeight: '500', letterSpacing: '1.28px' }}>
                  Mark all as read
                </SecondaryText>
              </Button>
            </Col>
          </Row>
          <Row justify="start" align="middle">
            <Col>
              <StyledRadioButton
                defaultValue="all"
                buttonStyle="solid"
                onChange={(ev) => {
                  setPage((prev) => ({
                    page: 1,
                    size: 5,
                    status: ev.target.value,
                  }));
                  setResult([]);
                }}
              >
                <Radio.Button value="all">All</Radio.Button>
                <Radio.Button value="unread">Unread</Radio.Button>
              </StyledRadioButton>
            </Col>
          </Row>
        </VerticalSpace>
      }
      overlayInnerStyle={{ overflow: 'auto', height: '60vh' }}
      overlayStyle={{
        width: '374px',
        borderRadius: '4px',
        border: '1px solid #FFF',
        background: 'linear-gradient(136deg, rgba(241, 242, 244, 0.72) 0%, rgba(255, 255, 255, 0.65) 100%)',
        boxShadow: '-4px -4px 6px 0px rgba(65, 65, 65, 0.08)',
        backdropFilter: 'blur(16px)',
      }}
      content={<NotificationsList page={page} result={result} setResult={setResult} setPage={setPage} />}
    >
      <Badge color="#F97070" dot offset={[-5, 10]}>
        <Bell />
      </Badge>
    </Popover>
  );
};
