import { EditOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Button } from 'components/button';
import { DeleteEdgeModal } from 'components/modal/delete-edge-modal';
import { Title } from 'components/typography';
import { useViewDatasheetEdge } from 'context/datasheet-edge-view-vontext';

type ViewNodeProps = {
  isEdit: boolean;
  setIsEdit: (x: boolean) => void;
  onClose: () => void;
};

export const ViewEdgeTitle = ({ isEdit, setIsEdit, onClose }: ViewNodeProps) => {
  const { state: selectedView } = useViewDatasheetEdge();

  return (
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <Space>
        <Title level={3}>{selectedView?.source.name}</Title>
        {' - '}
        <Title level={3}>{selectedView?.target.name}</Title>
      </Space>
      <div>
        <Button type="link" disabled={isEdit} icon={<EditOutlined />} onClick={() => setIsEdit(true)} />
        <DeleteEdgeModal id={selectedView?.project_edge_type_id || ''} onClose={onClose} />
      </div>
    </Space>
  );
};
