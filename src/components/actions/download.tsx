import { useParams } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { MainActionButton } from './main-action-button';
import { ActionProps } from './type';
import { useDataSheetWrapper } from '../layouts/components/data-sheet/wrapper';
import { DownloadFile } from './utils';
import { useLocalStorageGet } from 'hooks/use-local-storage-get';
import { AUTH_KEYS } from 'helpers/constants';
import { useGetProjectInfo } from 'api/projects/use-get-project-info';
export const DownloadAction = ({ button }: ActionProps) => {
  const params = useParams();
  const { nodeTypeId } = useDataSheetWrapper();
  const { data: projectData } = useGetProjectInfo({ id: params.id }, { enabled: !!params.id });
  const token = useLocalStorageGet<string>(AUTH_KEYS.TOKEN, '');
  const handleDownload = async () => {
    if (nodeTypeId) {
      await DownloadFile(nodeTypeId, false, token, '', projectData?.title);
    }
  };
  return <MainActionButton helpText="Export Data" {...button} icon={<UploadOutlined />} onClick={handleDownload} />;
};
