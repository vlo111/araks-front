import { Col, Row } from 'antd';
import { VerticalSpace } from 'components/space/vertical-space';
import { ImportTabs } from 'components/tabs/import-tabs';
import { ImportState, useImport } from 'context/import-context';
import { useCallback, useMemo, useState } from 'react';
import { ImportSheetTable } from './import-sheet-table';
import { ExcelType } from './types';

const extractTabNames = (state: ImportState) =>
  (state?.data as ExcelType[])?.[0].sheetName
    ? (state?.data as ExcelType[])?.map((item: ExcelType) => item.sheetName)
    : null;

/**
 * Component to show grid with sheets
 * @returns
 */
export const ImportExcel = () => {
  const { state } = useImport();

  const [activeTab, setActiveTab] = useState('0');

  const onChange = useCallback((key: string) => {
    setActiveTab(key);
  }, []);

  const getTabNames = useMemo(() => extractTabNames(state), [state]);

  return (
    <VerticalSpace size="large">
      {getTabNames && (
        <Row>
          <Col span={8}>
            <ImportTabs
              tabBarGutter={40}
              tabBarStyle={{
                background: 'transparent',
              }}
              defaultActiveKey={activeTab}
              items={getTabNames.map((item, index) => ({ key: index.toString(), label: item }))}
              onChange={onChange}
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col span={24}>{getTabNames && <ImportSheetTable activeTab={activeTab} />}</Col>
      </Row>
    </VerticalSpace>
  );
};
