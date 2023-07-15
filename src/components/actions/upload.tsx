import { UploadOutlined } from '@ant-design/icons';
import { ImportActionType, useImport } from 'context/import-context';
import { MainActionButton } from './main-action-button';
import { ActionProps } from './type';

export const UploadAction = ({ icon, button }: ActionProps) => {
  const { dispatch } = useImport();
  return (
    <MainActionButton
      helpText="Import Data"
      {...button}
      icon={<UploadOutlined />}
      onClick={() => dispatch({ type: ImportActionType.IMPORT_OPEN, payload: {} })}
    />
  );
};
