import { EditOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Button } from 'components/button';
import { DeleteNodeModal } from 'components/modal/delete-node-modal';
import { MenuText, Text } from 'components/typography';
import { useViewDatasheet } from 'context/datasheet-view-vontext';
import { useOverview } from 'context/overview-context';
import { useMemo } from 'react';
import { getSingleData } from './utils';

type ViewNodeProps = {
  id: string;
  isEdit: boolean;
  setIsEdit: (x: boolean) => void;
  onClose: () => void;
};

export const ViewNodeTitle = ({ id, isEdit, setIsEdit, onClose }: ViewNodeProps) => {
  const { state } = useOverview();

  const { state: selectedView } = useViewDatasheet();

  const defaultProperty = useMemo(
    () => selectedView?.properties?.find((property) => property.nodeTypeProperty.default_property),
    [selectedView?.properties]
  );
  return (
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <div>
        <MenuText strong>{state}</MenuText>
        {' / '}
        <Text>{getSingleData(defaultProperty?.nodes_data)}</Text>
      </div>
      <div>
        <Button type="link" disabled={isEdit} icon={<EditOutlined />} onClick={() => setIsEdit(true)} />
        <DeleteNodeModal id={id} onClose={onClose} />
      </div>
    </Space>
  );
};
