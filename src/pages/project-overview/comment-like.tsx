import { Tabs } from 'antd';
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
      padding: 32px;

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
      height: 100vh;
    }
  }
`;

export const CommentLike = () => {
  return <StyledTabs defaultActiveKey="1" centered items={tabItems} tabBarGutter={185} />;
};
