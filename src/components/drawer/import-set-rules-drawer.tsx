import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Drawer, Modal, notification, Row } from 'antd';
import { Button } from 'components/button';
import { ImportCancelButton } from 'components/button/import-cancel-button';
import { SetRules } from 'components/form/import/set-rules';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';

import { ImportActionType, useImport } from 'context/import-context';

export const ImportSetRulesDrawer = () => {
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
      open
      placement="right"
      closable={false}
      footer={
        <Row justify="end" gutter={32}>
          <Col span={6}>
            <ImportCancelButton name="Cancel" type={ImportActionType.IMPORT_CLOSE} />
          </Col>
          <Col span={6}>
            <Button
              block
              type="primary"
              onClick={() =>
                !state.setRulesSkipOverwrite
                  ? api.warning({
                      message: 'Please set rule at first!',
                    })
                  : dispatch({ type: ImportActionType.IMPORT_MERGE, payload: {} })
              }
            >
              Import
            </Button>
          </Col>
        </Row>
      }
      onClose={handleCancel}
      getContainer={false}
      destroyOnClose
      contentWrapperStyle={{
        width: '100%',
        height: '130%',
      }}
      mask={false}
    >
      <VerticalSpace size="large">
        <div style={{ textAlign: 'center' }}>
          <InfoCircleOutlined />
        </div>
        <VerticalSpace size={0}>
          <Text>
            You&apos;ll need to choose a merging rule for rows that match all unique properties in your data model:
          </Text>
          <ol>
            <li>
              &apos;Skip&apos; will ignore these rows during the import process, preserving the existing data in your
              model.
            </li>
            <li>
              &apos;Overwrite&apos; will replace the existing data in your model with the data from the matching rows in
              the import.
            </li>
          </ol>
        </VerticalSpace>
        {contextHolder}
        <SetRules />
      </VerticalSpace>
    </Drawer>
  );
};
