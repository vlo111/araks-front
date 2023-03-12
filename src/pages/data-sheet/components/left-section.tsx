import { Tabs as TabsComponent, TabsProps } from "antd";
import { textSizeMedia } from "components/typography/text";
import { COLORS, screenSize } from "helpers/constants";
import { useIsXXlScreen } from "hooks/use-breakpoint";
import styled from "styled-components";
import { NodesHeader } from "./nodes-header";

const Tabs = styled(TabsComponent)`
    &&{
        .ant-tabs-nav {
            box-shadow: none;
            border-bottom: 1px solid ${COLORS.PRIMARY.GRAY};

            .ant-tabs-tab {
                padding: 0 40px;
                color: ${COLORS.PRIMARY.GRAY};

                @media (max-width: ${screenSize.xxl}) { 
                    padding: 0 10px;
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

const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tables',
      children: `Content of Tab Pane 1`,
    },
    {
      key: '2',
      label: 'All Data',
      children: `Content of Tab Pane 2`,
    },
];

export const LeftSection = () => {
    const isXXL = useIsXXlScreen();
    const onChange = (key: string) => {
        console.log(key);
    };
    return <Tabs tabBarGutter={isXXL? 50 : 10} defaultActiveKey="1" items={items.map(
        item => ({
          ...item,  
          children: <div className='site-layout-content'>
            {item.key === '1' && <>
              <NodesHeader />
            </>}
          </div>
        })
      )} onChange={onChange} />
}