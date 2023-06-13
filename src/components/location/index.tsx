import { useState } from 'react';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Input } from 'components/input';
import { MapModal } from 'components/modal/map-modal';
import { Location, SelectedLocation } from 'components/modal/types';

const prefix = <EnvironmentOutlined />;

interface LocationInputProps {
  value?: Location;
  onChange?: (location: Location) => void;
  onChangeValue?: (location: Location) => void;
}

export const LocationInput = ({ value, onChange }: LocationInputProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onSelectLocation = (location: Location) => {
    if (onChange) {
      onChange(location);
    }
  };

  const onOpenModal = () => {
    setModalVisible(true);
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Input prefix={prefix} value={value ? value.address : ''} onClick={onOpenModal} />
      <MapModal
        visible={modalVisible}
        onCancel={onCloseModal}
        onSelectLocation={onSelectLocation}
        defaultCenter={
          value && value.lat && value.lng ? ({ lat: value?.lat, lng: value.lng } as SelectedLocation) : undefined
        }
      />
    </>
  );
};
