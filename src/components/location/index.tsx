import { useState } from 'react';
import { InputProps } from 'antd';
import styled from 'styled-components';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Input } from 'components/input';
import { MapModal } from 'components/modal/map-modal';

const prefix = <EnvironmentOutlined />;

interface Location {
  lat?: number;
  lng?: number;
}

export const Location = styled((props: InputProps) => <Input {...props} prefix={prefix} placeholder="Location" />)``;

interface LocationInputProps {
  value?: Location | null;
  onChange?: (location: Location) => void;
}

export const LocationInput = ({ value, onChange }: LocationInputProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onSelectLocation = (location: Location) => {
    if (onChange) {
      onChange(location);
    }
  };

  const onOpenModal = () => {
    // eslint-disable-next-line no-console
    console.log('click');
    setModalVisible(true);
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Input value={value ? `${value.lat}, ${value.lng}` : ''} onClick={onOpenModal} />
      <MapModal visible={modalVisible} onCancel={onCloseModal} onSelectLocation={onSelectLocation} />
    </>
  );
};
