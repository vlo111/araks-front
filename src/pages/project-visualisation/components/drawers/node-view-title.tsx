import { EditOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Button } from 'components/button';
import { DeleteNodeModal } from 'components/modal/delete-node-modal';
import { useOverview } from 'context/overview-context';
import { NodeDataResponse } from "types/node";
import { MenuText } from "components/typography";

type ViewNodeProps = {
  id: string;
  data: NodeDataResponse | undefined;
  isEdit: boolean;
  setIsEdit: (x: boolean) => void;
  onClose: () => void;
};

export const NodeViewTitle = ({ id, data, isEdit, setIsEdit, onClose }: ViewNodeProps) => {
  const { state } = useOverview();

  return (
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <div>
        <MenuText strong>{state}</MenuText>
      </div>
      <div>
        <Button type="link" disabled={isEdit} icon={<EditOutlined />} onClick={() => setIsEdit(true)} />
        <DeleteNodeModal id={id} onClose={onClose} />
      </div>
    </Space>
  );
};
