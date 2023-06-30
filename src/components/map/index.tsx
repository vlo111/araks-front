import { useEffect, useMemo, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { SelectedLocation } from 'components/modal/types';
import { renderToString } from 'react-dom/server';

import { ReactComponent as MapPin } from 'components/icons/map-pin.svg';
import { Skeleton } from 'antd';

interface MapProps {
  defaultCenter?: SelectedLocation;
}

/** @deprecated not used, use the MapModal component  */
export const MapView = ({ defaultCenter }: MapProps) => {
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
    }
  }, [defaultCenter]);

  const markerOptions: google.maps.MarkerOptions = useMemo(() => {
    return window.google && isLoaded
      ? {
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(renderToString(<MapPin />))}`,
            scaledSize: new window.google.maps.Size(48, 48),
          },
        }
      : {};
  }, [isLoaded]);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={{ width: '100%', height: '400px' }} center={center} zoom={12}>
      {center && <Marker position={center} options={markerOptions} />}
    </GoogleMap>
  ) : (
    <Skeleton />
  );
};
