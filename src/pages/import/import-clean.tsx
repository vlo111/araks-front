import { Col, Drawer, Modal, notification, Row } from 'antd';
import { Button } from 'components/button';
import { ImportCancelButton } from 'components/button/import-cancel-button';
import { FirstRowColumnName } from 'components/form/import/first-row-coluymn-name';
import { SkipTopRowsForm } from 'components/form/import/skip-top-rows-form';
import { VerticalSpace } from 'components/space/vertical-space';

import { ImportActionType, useImport } from 'context/import-context';

export const ImportClean = () => {
  const { state, dispatch } = useImport();
  const [api, contextHolder] = notification.useNotification();

  const handleCancel = () => {
    Modal.confirm({
      title: 'Are you sure you want to cancel current import process? All data will be cleared.',
      onOk: () => dispatch({ type: ImportActionType.IMPORT_CLOSE, payload: {} }),
    });
  };

  return (
    <Drawer
      open={state.step === 1}
      placement="right"
      closable={false}
      footer={
        <Row justify="end" gutter={32}>
          <Col span={12}>
            <ImportCancelButton name="Cancel" type={ImportActionType.IMPORT_CLOSE} />
          </Col>
          <Col span={12}>
            <Button
              block
              type="primary"
              // disabled={!state.firstRowIsColumn}
              onClick={() =>
                !state.firstRowIsColumn
                  ? api.warning({
                      message: 'Please select required field!',
                      description: (
                        <>
                          <strong>First row contains column name field</strong> is required
                        </>
                      ),
                    })
                  : dispatch({ type: ImportActionType.IMPORT_MAPPING_STEP, payload: {} })
              }
            >
              Next
            </Button>
          </Col>
        </Row>
      }
      onClose={handleCancel}
      getContainer={false}
      destroyOnClose
      contentWrapperStyle={{
        width: '30%',
        height: '100%',
      }}
      mask={false}
    >
      <VerticalSpace size="large">
        {contextHolder}
        <SkipTopRowsForm />
        <FirstRowColumnName />
      </VerticalSpace>
    </Drawer>
  );
};
