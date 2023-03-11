import { Tabs as TabsComponent, TabsProps } from "antd";
import { textSizeMedia } from "components/typography/text";
import { screenSize } from "helpers/constants";
import { useIsXXlScreen } from "hooks/use-breakpoint";
import styled from "styled-components";

const Tabs = styled(TabsComponent)`
    &&{
        .ant-tabs-nav {
            box-shadow: none;
            border-bottom: 1px solid #808080;

            .ant-tabs-tab {
                padding: 0 40px;

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
            {item.key === '1' && <>Hello</>}
          </div>
        })
      )} onChange={onChange} />
}