import { Tabs as TabsComponent } from 'antd';
import { textSizeMedia } from 'components/typography/text';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';

export const DataSheetSiderTabs = styled(TabsComponent)`
  &&& {
    .ant-tabs-nav {
      box-shadow: none;
      border-bottom: 1px solid ${COLORS.PRIMARY.GRAY};
      margin: 24px;

      .ant-tabs-tab {
        color: ${COLORS.PRIMARY.GRAY};

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
