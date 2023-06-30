import { EnvironmentOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { MapModal } from 'components/modal/map-modal';
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
      <MapModal
        visible={visible}
        address={text}
        hideFooter
        onCancel={() => {
          setVisible(false);
        }}
        defaultCenter={
          {
            lat: location?.location.latitude,
            lng: location?.location.longitude,
          } as SelectedLocation
        }
      />
    </>
  );
};
