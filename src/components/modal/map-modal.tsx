import { useEffect, useMemo, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Modal, Skeleton } from 'antd';
import { ReactComponent as MapPin } from 'components/icons/map-pin.svg';
import { renderToString } from 'react-dom/server';
import { Location, SelectedLocation } from './types';

interface MapModalProps {
  defaultCenter?: SelectedLocation;
  visible: boolean;
  onCancel: () => void;
  onSelectLocation: (location: Location) => void;
}

export const MapModal = ({ visible, onCancel, onSelectLocation, defaultCenter }: MapModalProps) => {
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(defaultCenter || null);
  const [center, setCenter] = useState(defaultCenter);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  useEffect(() => {
    if (!defaultCenter) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        } as SelectedLocation);
      });
    } else {
      setCenter(defaultCenter);
      setSelectedLocation(defaultCenter);
    }
  }, [defaultCenter]);

  const markerOptions: google.maps.MarkerOptions = useMemo(() => {
    return window.google && selectedLocation
      ? {
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(renderToString(<MapPin />))}`,
            scaledSize: new window.google.maps.Size(48, 48),
          },
        }
      : {};
  }, [selectedLocation]);

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { location: event.latLng },
      (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
        if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
          const formattedAddress = results[0].formatted_address;

          setSelectedLocation({ lat: lat ?? 0, lng: lng ?? 0, address: formattedAddress });
        }
      }
    );
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
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={center}
            zoom={12}
            onClick={handleMapClick}
          >
            {selectedLocation && <Marker position={selectedLocation} options={markerOptions} />}
          </GoogleMap>
        ) : (
          <Skeleton />
        )}
      </div>
    </Modal>
  );
};
