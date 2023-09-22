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
import { downloadFile } from 'components/actions/utils';

type ViewNodeProps = {
  id: string;
  isEdit: boolean;
  setIsEdit: (x: boolean) => void;
  onClose: () => void;
};

export const ViewNodeTitle = ({ id, isEdit, setIsEdit, onClose }: ViewNodeProps) => {
  const { nodeTypeId } = useDataSheetWrapper();
  const { projectInfo } = useProject();
  const { state } = useOverview();
  const isPublicPage = useIsPublicPage();

  const handleDownload = async () => {
    if (nodeTypeId) {
      await downloadFile(nodeTypeId, true);
    }
  };

  const { state: selectedView } = useViewDatasheet();

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
        <Button type="link" disabled icon={<Icon color="#414141" icon="visualisation" size={24} />} />
        <NodeCommentDrawer>
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
