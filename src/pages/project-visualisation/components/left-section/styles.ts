import styled from 'styled-components';
import { Tabs as TabsComponent } from 'antd';
import { COLORS } from '../../../../helpers/constants';
import { textSizeMedia } from '../../../../components/typography/text';

export const StyledDataVisualisationSiderTabs = styled(TabsComponent)`
  &&& {
    height: 100%;
    width: 100%;
    .ant-tabs-content {
      height: 100%;
      background: #F2F2F2;
      .ant-tabs-tabpane {
        height: 100%;
        width: 100%;
      }
    }
    .ant-tabs-nav {
      box-shadow: none;
      border-bottom: 1px solid ${COLORS.PRIMARY.GRAY};
      margin: 0 24px;

      .ant-tabs-tab {
        color: ${COLORS.PRIMARY.GRAY};
        margin-left: 48px;
        letter-spacing: 1.4px;
        &:first-child {
          margin-left: 0;
        }

        .ant-tabs-tab-btn {
          ${textSizeMedia}
        }
      }

      .ant-tabs-tab-active {
        background-color: transparent;
        border: none;
        box-shadow: none;
        color: ${COLORS.PRIMARY.BLUE};
      }

      .ant-tabs-ink-bar {
        height: 4px;
        background-color: ${COLORS.PRIMARY.BLUE};
      }
    }
  }
`;
