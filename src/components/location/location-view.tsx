import { EnvironmentOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { MapView } from 'components/map';
import { SelectedLocation } from 'components/modal/types';
import { useState } from 'react';
import { ResponseLocationType } from 'types/node';

type Props = {
  text: string;
  location?: ResponseLocationType;
};

export const LocationView = ({ text, location }: Props) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button type="text" onClick={() => setVisible(true)} icon={<EnvironmentOutlined />}>
        <span>{text}</span>
      </Button>
      <Modal title="Selected Location" open={visible} onCancel={() => setVisible(false)} destroyOnClose footer={false}>
        <MapView
          defaultCenter={
            {
              lat: location?.location.latitude,
              lng: location?.location.longitude,
            } as SelectedLocation
          }
        />
      </Modal>
    </>
  );
};
