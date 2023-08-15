import { Col, Row } from 'antd';
import { Button } from 'components/button';
import { VerticalSpace } from 'components/space/vertical-space';
import { ImportTable } from 'components/table/import-table';
import { ImportTabs } from 'components/tabs/import-tabs';
import { ImportActionType, ImportState, useImport } from 'context/import-context';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const { state, dispatch } = useImport();

  const [activeTab, setActiveTab] = useState('0');

  const onChange = useCallback((key: string) => {
    setActiveTab(key);
  }, []);

  const getTabNames = useMemo(() => extractTabNames(state), [state]);

  useEffect(() => {
    if (state.step === 0) {
      dispatch({ type: ImportActionType.IMPORT_SHEET_SELECT_DATA, payload: { activeTab: +activeTab } });
    }
  }, [activeTab, dispatch, state.step]);

  return (
    <VerticalSpace size="large">
      {getTabNames && state.step === 0 && (
        <Row>
          <Col span={10}>
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
      {state.step === 1 && (
        <Button type="link" onClick={() => dispatch({ type: ImportActionType.IMPORT_SUCCESS_NEXT, payload: {} })}>
          Back
        </Button>
      )}
      <Row>
        {(!state.showMapping || state.showMappingResult) && (
          <Col span={24}>{getTabNames && <ImportSheetTable activeTab={activeTab} />}</Col>
        )}
        {state.step === 2 && state.showMapping && !state.showMappingResult && (
          <Col span={24}>
            <ImportTable />
          </Col>
        )}
      </Row>
    </VerticalSpace>
  );
};
