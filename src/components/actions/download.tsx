import { UploadOutlined } from '@ant-design/icons';
import { MainActionButton } from './main-action-button';
import { ActionProps } from './type';
import { downloadFile } from './utils';
import { useDataSheetWrapper } from '../layouts/components/data-sheet/wrapper';

export const DownloadAction = ({ button }: ActionProps) => {
  const { nodeTypeId } = useDataSheetWrapper();

  const handleDownload = async () => {
    if (nodeTypeId) {
      await downloadFile(nodeTypeId);
    }
  };
  return <MainActionButton helpText="Export Data" {...button} icon={<UploadOutlined />} onClick={handleDownload} />;
};
