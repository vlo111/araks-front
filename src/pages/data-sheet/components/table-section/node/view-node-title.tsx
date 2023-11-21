import { UploadOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { UserProjectRole } from 'api/types';
import { Button } from 'components/button';
import { NodeCommentDrawer } from 'components/drawer/node-drawer/node-comment-drawer';
import { Icon } from 'components/icon';
import { DeleteNodeModal } from 'components/modal/delete-node-modal';
import { MenuText, Text } from 'components/typography';
import { useViewDatasheet } from 'context/datasheet-view-vontext';
import { useOverview } from 'context/overview-context';
import { useProject } from 'context/project-context';
import { useIsPublicPage } from 'hooks/use-is-public-page';
import { Comments } from 'pages/project-overview/components/comment-like/comments';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { DownloadFile } from 'components/actions/utils';
import { useLocalStorageGet } from 'hooks/use-local-storage-get';
import { AUTH_KEYS, PATHS } from 'helpers/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProjectInfo } from 'api/projects/use-get-project-info';
import { useGetSelectedSearchData } from 'api/visualisation/use-get-selected-search';

type ViewNodeProps = {
  id: string;
  isEdit: boolean;
  setIsEdit: (x: boolean) => void;
  onClose: () => void;
  drawerIsOpened: boolean;
};

export const ViewNodeTitle = ({ id, isEdit, setIsEdit, onClose, drawerIsOpened }: ViewNodeProps) => {
  const params = useParams();

  const navigate = useNavigate();

  const { mutate } = useGetSelectedSearchData({
    onSuccess: (data) => {
      navigate(`${isPublicPage ? PATHS.PUBLIC : ''}${PATHS.PROJECT_VISUALISATION}`.replace(':id', params?.id ?? ''), {
        state: {
          data: data.data,
        },
      });
    },
  });

  const token = useLocalStorageGet<string>(AUTH_KEYS.TOKEN, '');
  const { nodeTypeId } = useDataSheetWrapper();
  const { projectInfo } = useProject();
  const { state } = useOverview();
  const isPublicPage = useIsPublicPage();
  const { state: selectedView } = useViewDatasheet();
  const { data: projectData } = useGetProjectInfo({ id: params.id }, { enabled: !!params.id });

  const handleDownload = async () => {
    if (nodeTypeId) {
      await DownloadFile(nodeTypeId, true, token, id, projectData?.title);
    }
  };

  return (
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <div>
        <MenuText strong>{state}</MenuText>
        {' / '}
        <Text>{selectedView?.name}</Text>
      </div>
      <Space>
        {projectInfo && projectInfo?.role !== UserProjectRole.Viewer && !isPublicPage && (
          <Button
            type="link"
            disabled={isEdit}
            icon={<Icon color="#414141" icon="edit-simple-pen" size={20} />}
            onClick={() => setIsEdit(true)}
          />
        )}
        <Button
          type="link"
          onClick={() => mutate({ id, action: 'node' })}
          icon={<Icon color="#414141" icon="visualisation" size={24} />}
        />
        <NodeCommentDrawer nodeId={id} parentDrawerClosed={!drawerIsOpened}>
          <Comments nodeId={id} />
        </NodeCommentDrawer>
        <Button
          type="link"
          onClick={handleDownload}
          icon={<UploadOutlined style={{ color: '#414141', fontSize: '24px' }} />}
        />
        {projectInfo && projectInfo?.role !== UserProjectRole.Viewer && !isPublicPage && (
          <DeleteNodeModal id={id} onClose={onClose} />
        )}
      </Space>
    </Space>
  );
};
