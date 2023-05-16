import { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Modal } from 'antd';
import { ReactComponent as MapPin } from 'components/icons/map-pin.svg';
import { renderToString } from 'react-dom/server';

interface Location {
  lat?: number;
  lng?: number;
}

interface MapModalProps {
  visible: boolean;
  onCancel: () => void;
  onSelectLocation: (location: Location) => void;
}

const markerOptions: google.maps.MarkerOptions = {
  icon: {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(renderToString(<MapPin />))}`,
    scaledSize: new window.google.maps.Size(48, 48),
  },
};

export const MapModal = ({ visible, onCancel, onSelectLocation }: MapModalProps) => {
  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    setSelectedLocation({ lat: lat ?? center.lat, lng: lng ?? center.lng });
    onSelectLocation({ lat, lng });
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
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={center}
          zoom={12}
          onClick={handleMapClick}
        >
          {selectedLocation && <Marker position={selectedLocation} options={markerOptions} />}
        </GoogleMap>
      </div>
    </Modal>
  );
};
