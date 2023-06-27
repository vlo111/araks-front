import { TabsProps } from 'antd';
import { DataSheetActionKind } from 'components/layouts/components/data-sheet/hooks/data-sheet-manage';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
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
  const { dispatch } = useDataSheetWrapper();

  const isXXL = useIsXXlScreen();
  const onChange = (activeKey: string) => {
    if (activeKey === '1') {
      dispatch({ type: DataSheetActionKind.TABLES_SELECTED, payload: {} });
      return;
    }
    dispatch({ type: DataSheetActionKind.ALL_TYPE_SELECTED, payload: {} });
    return;
  };
  return (
    <DataSheetSiderTabs
      tabBarGutter={isXXL ? 50 : 30}
      destroyInactiveTabPane
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
              <TabTables isCheckable noColors hideConnection />
            </>
          ),
      }))}
      onChange={onChange}
    />
  );
};
