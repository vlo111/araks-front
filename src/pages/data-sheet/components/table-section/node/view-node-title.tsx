import { EditOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Button } from 'components/button';
import { MenuText, Text } from 'components/typography';
import { useViewDatasheet } from 'context/datasheet-view-vontext';
import { useOverview } from 'context/overview-context';
import { useMemo } from 'react';
import { getSingleData } from './utils';

type ViewNodeProps = {
  isEdit: boolean;
  setIsEdit: (x: boolean) => void;
};

export const ViewNodeTitle = ({ isEdit, setIsEdit }: ViewNodeProps) => {
  const { state } = useOverview();

  const { state: selectedView } = useViewDatasheet();

  const defaultProperty = useMemo(
    () => selectedView?.properties?.find((property) => property.nodeType.default_property),
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
      </div>
    </Space>
  );
};
