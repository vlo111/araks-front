import { TabsProps } from 'antd';
import { DataSheetSiderTabs } from 'components/tabs/data-sheet-sider-tabs';
import { useIsXXlScreen } from 'hooks/use-breakpoint';
import { TabTables } from './tab-tables';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tables',
  },
  {
    key: '2',
    label: 'All Data',
  },
];

export const LeftSection = () => {
  const isXXL = useIsXXlScreen();
  const onChange = (key: string) => {
    return;
  };
  return (
    <DataSheetSiderTabs
      tabBarGutter={isXXL ? 50 : 30}
      defaultActiveKey="1"
      items={items.map((item) => ({
        ...item,
        children:
          item.key === '1' ? (
            <>
              <TabTables />
            </>
          ) : (
            <>
              <TabTables isCheckable noColors />
            </>
          ),
      }))}
      onChange={onChange}
    />
  );
};
