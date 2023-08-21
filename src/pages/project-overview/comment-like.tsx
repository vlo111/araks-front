import { Tabs } from 'antd';
import { useIsXXlScreen } from 'hooks/use-breakpoint';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Comments } from './components/comment-like/comments';

const tabItems = [
  {
    label: 'Comments',
    key: 'comments',
    children: <Comments />,
  },
  {
    label: 'Likes',
    key: 'likes',
    children: 'Content of Tab Pane',
  },
];

const StyledTabs = styled(Tabs)`
  &.ant-tabs {
    .ant-tabs-nav {
      background: #f2f2f2;
      box-shadow: none;
      padding: 24px 32px;

      .ant-tabs-nav-list {
        border-bottom: 1px solid black;

        .ant-tabs-tab {
          padding: 0 32px;
        }

        .ant-tabs-tab-active {
          background: transparent;
          box-shadow: none;

          .ant-tabs-ink-bar {
            height: 4px;
            background: #232f6a;
          }

          .ant-tabs-tab-btn {
            color: #232f6a;
          }
        }
      }
    }

    .ant-tabs-content-holder {
      background: #f2f2f2;
      height: 100%;

      .ant-tabs-content {
        padding: 0 32px;
      }

      .ant-tabs-content,
      .ant-tabs-tabpane {
        height: 100%;
      }
    }
  }
`;

export const CommentLike = () => {
  const [sectionHeight, setSectionHeight] = useState('100%');
  const isXXl = useIsXXlScreen();

  useEffect(() => {
    const headerHeight = document.getElementById('overview-header')?.clientHeight;
    const headerTabsHeight = document.querySelector('#overview-header-tabs .ant-tabs-nav')?.clientHeight;

    // Calculate the content height and set it to state
    const contentHeight = `calc(100vh - ${headerHeight}px - ${headerTabsHeight}px - 20px)`;
    setSectionHeight(contentHeight);
  }, []);
  return (
    <StyledTabs
      defaultActiveKey="1"
      centered
      items={tabItems}
      tabBarGutter={isXXl ? 185 : 0}
      style={{ height: sectionHeight }}
    />
  );
};
