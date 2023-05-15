import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import GoogleMapReact, { Coords } from 'google-map-react';
// import { ReactComponent as Araks } from '../icons/araks.svg';

// const MyMarker = ({ text }: { text: string }) => <div>{text}</div>;

interface MapModalProps {
  visible: boolean;
  onCancel: () => void;
  onSelectLocation: (location: Coords) => void;
}

export const MapModal = ({ visible, onCancel, onSelectLocation }: MapModalProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Coords | null>(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const mapOptions = {
    center,
    zoom: 12,
  };

  const onMapClick = (e: Coords) => {
    // eslint-disable-next-line no-console
    console.log('e', e);
    setSelectedLocation({
      lat: e.lat,
      lng: e.lng,
    });
  };

  const onOk = () => {
    if (selectedLocation) {
      onSelectLocation(selectedLocation);
    }
    onCancel();
  };

  return (
    <Modal title="Select Location" open={visible} onCancel={onCancel} onOk={onOk}>
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY1 || '' }}
          defaultCenter={mapOptions.center}
          defaultZoom={mapOptions.zoom}
          onClick={onMapClick}
        >
          {/* {selectedLocation && <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />} */}
        </GoogleMapReact>
      </div>
    </Modal>
  );
};
