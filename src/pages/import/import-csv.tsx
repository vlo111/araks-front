import { Col, Row, Table } from 'antd';
import { Button } from 'components/button';
import { VerticalSpace } from 'components/space/vertical-space';
import { ImportTable } from 'components/table/import-table';
import { ImportActionType, useImport } from 'context/import-context';

/**
 * Component to show grid data for CSV
 * @returns
 */
export const ImportCsv = () => {
  const { state, dispatch } = useImport();
  // eslint-disable-next-line no-console
  console.log('state', state);

  return (
    <VerticalSpace size="large">
      {state.step === 1 && (
        <Button type="link" onClick={() => dispatch({ type: ImportActionType.IMPORT_SUCCESS_NEXT, payload: {} })}>
          Back
        </Button>
      )}
      <Row>
        {(!state.showMapping || state.showMappingResult) && (
          <Col span={24}>
            <Table
              dataSource={state.dataSource}
              columns={state.columns}
              tableLayout="fixed"
              scroll={{ x: 'max-content' }}
              pagination={!!state.showMappingResult ? undefined : false}
            />
          </Col>
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
