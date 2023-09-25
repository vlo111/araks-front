import { UploadOutlined } from '@ant-design/icons';
import { MainActionButton } from './main-action-button';
import { ActionProps } from './type';
import { useDataSheetWrapper } from '../layouts/components/data-sheet/wrapper';
import { DownloadFile } from './utils';
import {useLocalStorageGet} from "hooks/use-local-storage-get";
import {AUTH_KEYS} from "helpers/constants";


export const DownloadAction = ({ button }: ActionProps) => {
  const { nodeTypeId } = useDataSheetWrapper();
  const token = useLocalStorageGet<string>(AUTH_KEYS.TOKEN, '');


  const handleDownload = async () => {
    if (nodeTypeId) {
      await DownloadFile(nodeTypeId, false, token);
    }
  };
  return <MainActionButton helpText="Export Data" {...button} icon={<UploadOutlined />} onClick={handleDownload} />;
};
