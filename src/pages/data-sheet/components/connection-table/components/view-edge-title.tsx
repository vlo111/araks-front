import { Space } from 'antd';
import { UserProjectRole } from 'api/types';
import { DeleteEdgeModal } from 'components/modal/delete-edge-modal';
import { Title } from 'components/typography';
import { useViewDatasheetEdge } from 'context/datasheet-edge-view-vontext';
import { useProject } from 'context/project-context';

type ViewNodeProps = {
  onClose: () => void;
};

/**
 *
 * Connection edge view title
 * @returns
 */
export const ViewEdgeTitle = ({ onClose }: ViewNodeProps) => {
  const { projectInfo } = useProject();
  const { state: selectedView } = useViewDatasheetEdge();

  return (
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <Space>
        <Title level={3}>{selectedView?.source.name}</Title>
        {' - '}
        <Title level={3}>{selectedView?.target.name}</Title>
      </Space>
      <div>
        {projectInfo?.role !== UserProjectRole.Viewer && (
          <DeleteEdgeModal id={selectedView?.id || ''} onClose={onClose} />
        )}
      </div>
    </Space>
  );
};
