import { EditOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Button } from 'components/button';
import { MenuText } from 'components/typography';
import { Icon } from 'components/icon';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';

type ViewNodeProps = {
  id: string;
  name: string;
  isEdit: boolean;
  canEdit?: boolean;
  setIsEdit: (x: boolean) => void;
  onClose: () => void;
};

export const EdgeViewTitle = ({ id, name, isEdit, setIsEdit, onClose, canEdit }: ViewNodeProps) => {
  const { startDeleteEdge } = useGraph();

  return (
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <div>
        <MenuText strong>{name.toUpperCase()}</MenuText>
      </div>
      {canEdit ? (
        <div>
          <Button type="link" disabled={isEdit} icon={<EditOutlined />} onClick={() => setIsEdit(true)} />
          <Button
            type="link"
            icon={<Icon color="#414141" icon="delete_outline-simple" size={24} />}
            onClick={() => startDeleteEdge({ id })}
          />
        </div>
      ) : (
        <></>
      )}
    </Space>
  );
};
