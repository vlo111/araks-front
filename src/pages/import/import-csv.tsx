import { Col, Row, Table } from 'antd';
import { Button } from 'components/button';
import { VerticalSpace } from 'components/space/vertical-space';
import { ImportMappingTable } from 'components/table/import-mapping-table';
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
        {!state.showMapping && (
          <Col span={24}>
            <Table
              dataSource={state.dataSource}
              columns={state.columns}
              tableLayout="fixed"
              scroll={{ x: 'max-content' }}
              pagination={false}
            />
          </Col>
        )}
        {state.step === 2 && state.showMapping && (
          <Col span={24}>
            <ImportMappingTable />
          </Col>
        )}
      </Row>
    </VerticalSpace>
  );
};
