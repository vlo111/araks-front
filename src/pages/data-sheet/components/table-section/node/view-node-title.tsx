import { DownloadOutlined } from '@ant-design/icons';
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
import { Comments } from 'pages/project-overview/components/comment-like/comments';

type ViewNodeProps = {
  id: string;
  isEdit: boolean;
  setIsEdit: (x: boolean) => void;
  onClose: () => void;
};

export const ViewNodeTitle = ({ id, isEdit, setIsEdit, onClose }: ViewNodeProps) => {
  const { projectInfo } = useProject();
  const { state } = useOverview();

  const { state: selectedView } = useViewDatasheet();

  return (
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <div>
        <MenuText strong>{state}</MenuText>
        {' / '}
        <Text>{selectedView?.name}</Text>
      </div>
      <Space>
        {projectInfo && projectInfo?.role !== UserProjectRole.Viewer && (
          <Button
            type="link"
            disabled={isEdit}
            icon={<Icon color="#414141" icon="edit-simple-pen" size={20} />}
            onClick={() => setIsEdit(true)}
          />
        )}
        <Button type="link" disabled icon={<Icon color="#414141" icon="visualisation" size={24} />} />
        <Button type="link" disabled icon={<Icon color="#414141" icon="chat_bubble_outline_black" size={24} />} />
        <NodeCommentDrawer>
          <Comments />
        </NodeCommentDrawer>
        <Button type="link" disabled icon={<DownloadOutlined style={{ color: '#414141', fontSize: '24px' }} />} />
        {projectInfo && projectInfo?.role !== UserProjectRole.Viewer && <DeleteNodeModal id={id} onClose={onClose} />}
      </Space>
    </Space>
  );
};
