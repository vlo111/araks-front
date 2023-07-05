import { Space } from 'antd';
import { DeleteEdgeModal } from 'components/modal/delete-edge-modal';
import { Title } from 'components/typography';
import { useViewDatasheetEdge } from 'context/datasheet-edge-view-vontext';

type ViewNodeProps = {
  onClose: () => void;
};

export const ViewEdgeTitle = ({ onClose }: ViewNodeProps) => {
  const { state: selectedView } = useViewDatasheetEdge();

  return (
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <Space>
        <Title level={3}>{selectedView?.source.name}</Title>
        {' - '}
        <Title level={3}>{selectedView?.target.name}</Title>
      </Space>
      <div>
        <DeleteEdgeModal id={selectedView?.id || ''} onClose={onClose} />
      </div>
    </Space>
  );
};
