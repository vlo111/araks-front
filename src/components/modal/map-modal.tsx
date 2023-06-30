import { useEffect, useMemo, useState } from 'react';
import { GoogleMap, Marker, StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
import { Input, Modal, Skeleton } from 'antd';
import { ReactComponent as MapPin } from 'components/icons/map-pin.svg';
import { renderToString } from 'react-dom/server';
import { Location, SelectedLocation } from './types';

interface MapModalProps {
  address?: string;
  defaultCenter?: SelectedLocation;
  visible: boolean;
  onCancel?: () => void;
  onSelectLocation?: (location: Location) => void;
  hideFooter?: boolean;
}

export const MapModal = ({
  address,
  visible,
  onCancel,
  onSelectLocation,
  defaultCenter,
  hideFooter = false,
}: MapModalProps) => {
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(defaultCenter || null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);

  const [center, setCenter] = useState(defaultCenter);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
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
      onSelectLocation?.(selectedLocation);
    }
    onCancel?.();
  };

  const renderMap = () => {
    const onLoad = (map: google.maps.Map) => {
      setMap(map);
    };

    const onSearchBoxLoad = (ref: google.maps.places.SearchBox) => {
      setSearchBox(ref);
    };

    const onPlacesChanged = () => {
      if (searchBox) {
        const places = searchBox.getPlaces();

        if (places?.length === 0) {
          return;
        }

        const bounds = new window.google.maps.LatLngBounds();
        places?.forEach((place) => {
          if (place.geometry && place.geometry.location) {
            bounds.extend(place.geometry.location);
          }
        });

        if (map) {
          map.fitBounds(bounds);
          // Adjust zoom level
          const zoom = 12; // Set your desired zoom level here
          map.setZoom(zoom);
        }
      }
    };

    return (
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={center}
        zoom={12}
        onClick={handleMapClick}
        onLoad={onLoad}
      >
        <StandaloneSearchBox onLoad={onSearchBoxLoad} onPlacesChanged={onPlacesChanged}>
          <Input
            type="text"
            placeholder="Search for a location"
            allowClear
            style={{
              boxSizing: 'border-box',
              border: '1px solid transparent',
              width: '220px',
              height: '40px',
              marginTop: '60px',
              padding: '0 11px',
              margin: '10px 0 0 190px',
              borderRadius: '3px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
              fontSize: '16px',
              fontWeight: 600,
              outline: 'none',
              textOverflow: 'ellipses',
            }}
          />
        </StandaloneSearchBox>
        {selectedLocation && <Marker position={selectedLocation} options={markerOptions} />}
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return (
    <Modal
      title={address || 'Select Location'}
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
      destroyOnClose
      // {hideFooter ? footer={false} : null}
      footer={hideFooter ? false : undefined}
    >
      <div style={{ height: '400px', width: '100%' }}>{isLoaded ? renderMap() : <Skeleton />}</div>
    </Modal>
  );
};
