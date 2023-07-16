import { Drawer, Modal } from 'antd';
import { FirstRowColumnName } from 'components/form/import/first-row-coluymn-name';
import { SkipTopRowsForm } from 'components/form/import/skip-top-rows-form';
import { VerticalSpace } from 'components/space/vertical-space';

import { ImportActionType, useImport } from 'context/import-context';

export const ImportClean = () => {
  const { state, dispatch } = useImport();

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
      onClose={handleCancel}
      getContainer={false}
      destroyOnClose
      contentWrapperStyle={{
        width: '30%',
      }}
      mask={false}
    >
      <VerticalSpace size="large">
        <SkipTopRowsForm />
        <FirstRowColumnName />
      </VerticalSpace>
    </Drawer>
  );
};
